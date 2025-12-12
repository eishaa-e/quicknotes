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
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
                <h2 className="text-2xl font-semibold mb-2">Create account</h2>
                <p className="text-sm text-slate-500 mb-4">Start using QuickNotes</p>

                {error && <div className="bg-red-50 text-red-600 p-2 rounded mb-3 text-sm">{error}</div>}

                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <label className="text-sm">Full name</label>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full mt-1 p-2 border rounded" />
                    </div>

                    <div>
                        <label className="text-sm">Email</label>
                        <input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full mt-1 p-2 border rounded" type="email" />
                    </div>

                    <div>
                        <label className="text-sm">Password</label>
                        <input required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full mt-1 p-2 border rounded" type="password" />
                    </div>

                    <div className="flex items-center justify-between">
                        <button disabled={submitting} className="px-4 py-2 bg-slate-700 text-white rounded">
                            {submitting ? 'Signing...' : 'Sign up'}
                        </button>
                        <Link to="/login" className="text-sm text-slate-600">Have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
