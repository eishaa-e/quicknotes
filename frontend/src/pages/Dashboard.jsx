import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterQ, setFilterQ] = useState('');
    const [category, setCategory] = useState('All');
    const [editing, setEditing] = useState(null);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const res = await api.get('/notes');
            setNotes(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleCreate = () => navigate('/create');

    const handleEdit = (note) => navigate(`/edit/${note._id}`, { state: { note } });

    const handleTrash = async (note) => {
        await api.delete(`/notes/${note._id}`);
        fetchNotes();
    };

    const handlePin = async (note) => {
        await api.put(`/notes/${note._id}`, { ...note, isPinned: !note.isPinned });
        fetchNotes();
    };

    const categories = ['All', ...Array.from(new Set(notes.map(n => n.category).filter(Boolean)))];

    const filtered = notes
        .filter(n => !n.isTrashed)
        .filter(n => (filterQ ? (n.title + ' ' + (n.content || '')).toLowerCase().includes(filterQ.toLowerCase()) : true))
        .filter(n => (category === 'All' ? true : (n.category || '') === category))
        .sort((a, b) => (b.isPinned - a.isPinned) || (new Date(b.createdAt) - new Date(a.createdAt)));

    return (
        <div className="min-h-screen">
            <Navbar onSearch={(q) => setFilterQ(q)} onClear={() => { setFilterQ(''); setCategory('All'); }} />
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold">Your Notes</h1>
                    <div className="flex items-center gap-3">
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button onClick={handleCreate} className="px-4 py-2 bg-slate-700 text-white rounded">New Note</button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-8">Loading notes...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.length === 0 ? (
                            <div className="p-6 bg-white border rounded text-slate-600">No notes yet. Create one!</div>
                        ) : filtered.map(n => (
                            <NoteCard
                                key={n._id}
                                note={n}
                                onEdit={handleEdit}
                                onDelete={handleTrash}
                                onPin={handlePin}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
