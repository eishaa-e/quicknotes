import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        const res = await login(form.email, form.password);
        setSubmitting(false);
        if (res.success) navigate('/');
        else setError(res.message || 'Login failed');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg p-6 shadow">
                <h2 className="text-2xl font-semibold mb-2">Login to QuickNotes</h2>
                <p className="text-sm text-slate-500 mb-4">Enter your account details</p>

                {error && <div className="bg-red-50 text-red-600 p-2 rounded mb-3 text-sm">{error}</div>}

                <form onSubmit={submit} className="space-y-3">
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
                            {submitting ? 'Logging...' : 'Login'}
                        </button>
                        <Link to="/register" className="text-sm text-slate-600">Create an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
