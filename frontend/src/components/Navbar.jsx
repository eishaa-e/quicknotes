import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Navbar({ onSearch, onClear }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [q, setQ] = useState('');

    const submitSearch = (e) => {
        e.preventDefault();
        onSearch && onSearch(q);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-xl font-semibold text-slate-700">QuickNotes</Link>
                    <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">Notes</Link>
                    <Link to="/trash" className="text-sm text-slate-500 hover:text-slate-700">Trash</Link>
                </div>

                <form onSubmit={submitSearch} className="flex items-center gap-2">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search notes..."
                        className="px-3 py-1 rounded-md border w-56 text-sm focus:outline-none"
                    />
                    <button type="submit" className="text-sm px-3 py-1 bg-slate-700 text-white rounded-md">Search</button>
                    <button
                        type="button"
                        onClick={() => { setQ(''); onClear && onClear(); }}
                        className="text-sm px-3 py-1 border rounded-md text-slate-600"
                    >
                        Clear
                    </button>
                </form>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="text-sm text-slate-600">Hi, <span className="font-medium text-slate-800">{user.name || user.email}</span></div>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm text-slate-600">Login</Link>
                            <Link to="/register" className="text-sm px-3 py-1 rounded-md bg-slate-700 text-white">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
