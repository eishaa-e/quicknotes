import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            if (localStorage.getItem('token')) {
                // Verify token or get user data if endpoint exists? 
                // For now, we assume if token exists, we are somewhat logged in. 
                // Ideally we should have a /me endpoint or similar.
                // Let's assume we can just decode the token or stick with token presence + localstorage user data if we saved it.
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            }
            setLoading(false);
        };
        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        const res = await axiosInstance.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        // We really should store user info or specific fields
        // Backend returns: { message, token } only in task-requirement?
        // Wait, task requirement says Auth API login response: { message, token }.
        // The Service login returns { _id, name, email, token }. The Controller sends it back?
        // Controller: res.json({ message: 'Login successful', token: user.token }).
        // Ah, Controller filters it. Let's fix controller to return user info too if needed, OR fetch it.
        // I'll stick to prompt requirements "Response: { message, token }".
        // So I can't store user object unless I decode token or another call.
        // Decoding token is easy.
        // Let's decode or just store the fact we are logged in.
        // Actually, for "Hello User", we need name. 
        // I will assume I can update the backend controller to return user info as it's standard practice, OR decode token.
        // I'll decode token OR just assume email for now.
        // Let's update controller to return user data as well, as it is very useful.
        // PROMPT: "Response: { message, token }" - I should strictly follow it?
        // "Implement exactly what is written".
        // Okay, I will decode the token in frontend to get ID, but name?
        // The token payload has ID.
        // I might need a /me endpoint or change login response. 
        // I will add a /me endpoint or just update login response to include user details?
        // Prompt says "Implement exactly what is written".
        // API spec says Login Response: message, token.
        // Does Register Response allow user data? Message, token.
        // Okay. I will strictly follow.
        // To show user name, I might need a "Profile" page or similar?
        // Line 146: Profile (optional).
        // I'll stick to minimal. Maybe I don't show name in Navbar?
        // Or I can add a `/auth/me` endpoint.
        // But prompt says "Backend API Specification" "Below is the COMPLETE set of APIs".
        // So I cannot add more APIs?
        // Maybe I should add user info to the Token Payload?
        // Service`generateToken` uses `id`. I can add name there.
        // Controller login uses `user.token`. Service login returns `{ _id, name, email, token }`.

        setUser({ token: res.data.token });
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await axiosInstance.post('/auth/register', { name, email, password });
        localStorage.setItem('token', res.data.token);
        setUser({ token: res.data.token });
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
