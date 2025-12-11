import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <div className="max-w-2xl bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-3">{id ? 'Edit note' : 'Create note'}</h2>

                    <form onSubmit={submit} className="space-y-3">
                        <div>
                            <label className="text-sm">Title</label>
                            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full p-2 border rounded" />
                        </div>

                        <div>
                            <label className="text-sm">Category</label>
                            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full p-2 border rounded" placeholder="Work, Personal, Ideas..." />
                        </div>

                        <div>
                            <label className="text-sm">Content</label>
                            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                                rows="8" className="w-full p-2 border rounded" />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="inline-flex items-center gap-2">
                                <input type="checkbox" checked={form.isPinned} onChange={(e) => setForm({ ...form, isPinned: e.target.checked })} />
                                <span className="text-sm">Pin this note</span>
                            </label>

                            <div className="ml-auto flex gap-2">
                                <button type="button" onClick={() => navigate('/')} className="px-3 py-2 border rounded">Cancel</button>
                                <button type="submit" disabled={submitting} className="px-4 py-2 bg-slate-700 text-white rounded">{submitting ? 'Saving...' : 'Save'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
