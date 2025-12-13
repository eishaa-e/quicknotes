import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        const res = await register(form.name, form.email, form.password);
        setSubmitting(false);
        if (res.success) navigate('/');
        else setError(res.message || 'Registration failed');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 p-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center text-white mb-3 shadow-lg shadow-pink-200 transform hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" /><path d="M15 3v5h5" /><path d="M8 12h8" /><path d="M8 16h5" /></svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">QuickNotes</h1>
                    <p className="text-slate-400 text-sm font-medium mt-1">Create your free account</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm text-center font-medium">{error}</div>}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                        <input
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-slate-50 border-slate-100 focus:bg-white border focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <input
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-slate-50 border-slate-100 focus:bg-white border focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all"
                            type="email"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                        <input
                            required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full bg-slate-50 border-slate-100 focus:bg-white border focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all"
                            type="password"
                            placeholder="Create a strong password"
                        />
                    </div>

                    <button
                        disabled={submitting}
                        className="w-full py-3.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-transform active:scale-95 shadow-lg shadow-slate-200"
                    >
                        {submitting ? 'Creating Account...' : 'Get Started'}
                    </button>

                    <p className="text-center text-slate-500 text-sm mt-6">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
