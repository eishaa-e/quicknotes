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
        if (token) {
            // optionally validate token by fetching profile
            setLoading(true);
            api.get('/auth/me')
                .then((res) => {
                    if (res.data?.user) {
                        setUser(res.data.user);
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                    }
                })
                .catch(() => {
                    // invalid token -> logout
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                })
                .finally(() => setLoading(false));
        }
    }, [token]);

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
