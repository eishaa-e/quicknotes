import React from 'react';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

export default function Profile() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="h-32 bg-slate-700 relative">
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                            <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center text-3xl font-bold text-slate-500 uppercase">
                                {user.name?.charAt(0) || user.email?.charAt(0)}
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8 text-center">
                        <h1 className="text-2xl font-bold text-slate-800 mb-1">{user.name}</h1>
                        <p className="text-slate-500 mb-6">{user.email}</p>

                        <div className="space-y-4 text-left">
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-400 uppercase font-semibold mb-1">User ID</p>
                                <p className="text-sm font-mono text-slate-600 truncate">{user._id}</p>
                            </div>

                            <button
                                onClick={logout}
                                className="w-full py-2.5 px-4 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
