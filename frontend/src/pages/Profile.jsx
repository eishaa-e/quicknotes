import React from 'react';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

export default function Profile() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-800 mb-6">My Profile</h1>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center text-3xl font-bold text-slate-500 uppercase">
                                {user.name?.charAt(0) || user.email?.charAt(0)}
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <h1 className="text-2xl font-bold text-slate-800 mb-1">{user.name}</h1>
                        <p className="text-slate-500 mb-8">{user.email}</p>

                        <div className="grid gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Account ID</p>
                                <p className="text-sm font-mono text-slate-600">{user._id}</p>
                            </div>

                            <button
                                onClick={logout}
                                className="w-full py-3 px-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors border border-red-100"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
