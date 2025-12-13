import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';
import NoteCard from '../components/NoteCard';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Folder, Plus } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterQ, setFilterQ] = useState('');
    const [category, setCategory] = useState('All');

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

    // Calculate Unique Categories (Folders)
    const folderNames = Array.from(new Set(notes.map(n => n.category || 'General').filter(Boolean)));
    const folders = folderNames.map((name, i) => {
        const colors = ['bg-blue-100 text-blue-800', 'bg-red-100 text-red-800', 'bg-yellow-100 text-yellow-800', 'bg-green-100 text-green-800'];
        return { name, color: colors[i % colors.length] };
    });

    const filtered = notes
        .filter(n => !n.isTrashed)
        .filter(n => (filterQ ? (n.title + ' ' + (n.content || '')).toLowerCase().includes(filterQ.toLowerCase()) : true))
        .filter(n => (category === 'All' ? true : (n.category || 'General') === category))
        .sort((a, b) => (b.isPinned - a.isPinned) || (new Date(b.createdAt) - new Date(a.createdAt)));

    return (
        <Layout onSearch={setFilterQ} onClear={() => { setFilterQ(''); setCategory('All'); }}>

            {/* Recent Folders Section */}
            <section className="mb-10">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Folders</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <button
                        onClick={() => setCategory('All')}
                        className={`p-6 rounded-3xl text-left border-2 transition-all ${category === 'All' ? 'border-slate-800 bg-slate-800 text-white' : 'border-dashed border-slate-300 hover:border-slate-400 bg-slate-50'}`}
                    >
                        <Folder size={24} className="mb-4 opacity-80" />
                        <p className="font-semibold">All Notes</p>
                        <p className="text-xs opacity-60 mt-1">{notes.length} files</p>
                    </button>

                    {folders.map(f => (
                        <button
                            key={f.name}
                            onClick={() => setCategory(f.name)}
                            className={`p-6 rounded-3xl text-left transition-all ${category === f.name ? 'ring-2 ring-offset-2 ring-slate-800 scale-105' : 'hover:scale-105'} ${f.color}`}
                        >
                            <Folder size={24} className="mb-4 opacity-80" />
                            <p className="font-semibold truncate">{f.name}</p>
                            <p className="text-xs opacity-60 mt-1">{notes.filter(n => (n.category || 'General') === f.name).length} files</p>
                        </button>
                    ))}

                    <button onClick={handleCreate} className="p-6 rounded-3xl border-2 border-dashed border-slate-300 hover:border-slate-500 hover:bg-slate-50 text-slate-400 hover:text-slate-600 flex flex-col items-center justify-center transition-all">
                        <div className="p-2 bg-slate-200 rounded-full mb-2"><Plus size={20} /></div>
                        <span className="font-medium text-sm">New Note</span>
                    </button>
                </div>
            </section>

            {/* My Notes Section */}
            <section>
                <div className="flex items-end justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">My Notes</h3>
                    <div className="flex gap-2">
                        {/* Pagination arrows could go here */}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-slate-400">Loading your notes...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.length === 0 ? (
                            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
                                <p>No notes found in this category.</p>
                            </div>
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
            </section>
        </Layout>
    );
}
