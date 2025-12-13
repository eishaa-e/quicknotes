import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import NoteCard from '../components/NoteCard';

export default function Trash() {
    const [trashed, setTrashed] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTrash = async () => {
        setLoading(true);
        try {
            const res = await api.get('/notes/trash');
            setTrashed(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrash();
    }, []);

    const handleRestore = async (note) => {
        await api.put(`/notes/restore/${note._id}`);
        fetchTrash();
    };

    const handleHardDelete = async (note) => {
        if (!confirm('Permanently delete this note?')) return;
        await api.delete(`/notes/hard-delete/${note._id}`);
        fetchTrash();
    };

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Trash Bin</h1>
                <p className="text-slate-500 text-sm">Notes in trash are restored or permanently deleted.</p>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : trashed.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center text-slate-400">Trash is empty.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trashed.map(n => (
                        <NoteCard key={n._id} note={n}
                            onRestore={handleRestore}
                            onHardDelete={handleHardDelete}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
}
