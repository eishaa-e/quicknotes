import React, { createContext, useEffect, useState } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    });
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token && user) {
            // we trust stored user because backend gives only token
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [token, user]);


    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            const t = res.data.token;
            const u = res.data.user || null;
            setToken(t);
            setUser(u);
            localStorage.setItem('token', t);
            if (u) localStorage.setItem('user', JSON.stringify(u));
            return { success: true };
        } catch (err) {
            return { success: false, message: err?.response?.data?.message || err.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/register', { name, email, password });
            const t = res.data.token;
            const u = res.data.user || null;
            setToken(t);
            setUser(u);
            localStorage.setItem('token', t);
            if (u) localStorage.setItem('user', JSON.stringify(u));
            return { success: true };
        } catch (err) {
            return { success: false, message: err?.response?.data?.message || err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
