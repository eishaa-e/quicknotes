import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Search, LogOut, Menu } from 'lucide-react';

export default function Navbar({ onSearch, onClear }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [q, setQ] = useState('');
    const location = useLocation();

    // Only show search on dashboard
    const showSearch = location.pathname === '/';

    const submitSearch = (e) => {
        e.preventDefault();
        onSearch && onSearch(q);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4 md:hidden">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">QN</span>
            </div>

            <div className="hidden md:block">
                <h2 className="text-xl font-bold text-slate-800">{location.pathname === '/' ? 'MY NOTES' : location.pathname.replace('/', '').toUpperCase()}</h2>
            </div>

            <div className="flex-1 max-w-lg mx-auto px-4">
                {showSearch && (
                    <form onSubmit={submitSearch} className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search..."
                            className="w-full bg-slate-50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none ring-2 ring-transparent focus:ring-blue-100 focus:bg-white transition-all shadow-sm"
                        />
                        {q && <button type="button" onClick={() => { setQ(''); onClear && onClear(); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600">✕</button>}
                    </form>
                )}
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                            <button onClick={handleLogout} className="text-xs text-slate-500 hover:text-red-500 transition-colors">Sign Out</button>
                        </div>
                        <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold overflow-hidden transition-transform hover:scale-105">
                            {user.name?.charAt(0)}
                        </Link>
                    </div>
                ) : (
                    <Link to="/login" className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition">Login</Link>
                )}
            </div>
        </header>
    );
}
