import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CreateEditNote() {
    const navigate = useNavigate();
    const { id } = useParams();
    const loc = useLocation();
    const [form, setForm] = useState({ title: '', content: '', category: '', isPinned: false });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // if note passed via state (edit navigation) use it
        if (loc.state?.note) {
            setForm(loc.state.note);
        } else if (id) {
            // fetch specific note
            (async () => {
                try {
                    const res = await api.get(`/notes/${id}`);
                    setForm(res.data);
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (id) {
                await api.put(`/notes/${id}`, form);
            } else {
                await api.post('/notes', form);
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to save note');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6 transition-colors">
                    <ArrowLeft size={18} />
                    <span>Back to Notes</span>
                </button>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-pink-100 to-blue-50 flex items-center px-8">
                        <h1 className="text-2xl font-bold text-slate-800">{id ? 'Edit Note' : 'Create New Note'}</h1>
                    </div>

                    <div className="p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                                <input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border-none rounded-xl text-lg font-medium focus:ring-2 focus:ring-pink-100 outline-none transition-all placeholder:text-slate-300"
                                    placeholder="Give your note a title..."
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                    <input
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                                        placeholder="e.g. Work, Ideas"
                                    />
                                </div>
                                <div className="flex items-end pb-1">
                                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={form.isPinned}
                                            onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
                                            className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500 border-gray-300"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Pin Note</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                                <textarea
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    rows="12"
                                    className="w-full p-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-pink-100 outline-none transition-all resize-none leading-relaxed"
                                    placeholder="Start typing your thoughts..."
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
                                <button type="button" onClick={() => navigate('/')} className="px-6 py-3 text-slate-500 font-medium hover:text-slate-700 transition">Cancel</button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-transform active:scale-95 shadow-lg shadow-slate-200"
                                >
                                    {submitting ? 'Saving...' : 'Save Note'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
