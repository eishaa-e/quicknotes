import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
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
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-xl font-semibold mb-4">Trash</h1>

                {loading ? (
                    <div>Loading...</div>
                ) : trashed.length === 0 ? (
                    <div className="bg-white p-6 rounded border">Trash is empty.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trashed.map(n => (
                            <NoteCard key={n._id} note={n}
                                onRestore={handleRestore}
                                onHardDelete={handleHardDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
