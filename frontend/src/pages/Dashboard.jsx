import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [isPinned, setIsPinned] = useState(false); // Used for new note
    const [editingNote, setEditingNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await axiosInstance.get('/notes');
            setNotes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingNote) {
                await axiosInstance.put(`/notes/${editingNote._id}`, { title, content, category, isPinned });
                setEditingNote(null);
            } else {
                await axiosInstance.post('/notes', { title, content, category, isPinned });
            }
            setTitle('');
            setContent('');
            setCategory('General');
            setIsPinned(false);
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category);
        setIsPinned(note.isPinned);
        window.scrollTo(0, 0); // Scroll to form
    };

    const handleCancelEdit = () => {
        setEditingNote(null);
        setTitle('');
        setContent('');
        setCategory('General');
        setIsPinned(false);
    }

    const deleteNote = async (note) => {
        try {
            await axiosInstance.delete(`/notes/${note._id}`);
            fetchNotes(); // Refresh list
        } catch (error) {
            console.error(error);
        }
    };

    const togglePin = async (note) => {
        try {
            await axiosInstance.put(`/notes/${note._id}`, { ...note, isPinned: !note.isPinned });
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            <Navbar />
            <div className="container mx-auto mt-8 px-4">

                {/* Search Bar */}
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="w-full max-w-md p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Create/Edit Form */}
                <div className="bg-white p-6 rounded shadow-md mb-8 max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
                    <form onSubmit={handleCreateOrUpdate}>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full border p-2 rounded"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                placeholder="Content"
                                className="w-full border p-2 rounded h-24"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex gap-4 mb-4">
                            <select className="border p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="General">General</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Ideas">Ideas</option>
                            </select>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} />
                                Pin Note
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                {editingNote ? 'Update Note' : 'Add Note'}
                            </button>
                            {editingNote && (
                                <button type="button" onClick={handleCancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Notes Grid */}
                {filteredNotes.length === 0 ? (
                    <p className="text-center text-gray-500">No notes found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Pinned Notes First */}
                        {filteredNotes.filter(n => n.isPinned).map(note => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onPin={togglePin}
                                onEdit={handleEdit}
                                onDelete={deleteNote}
                            />
                        ))}
                        {/* Other Notes */}
                        {filteredNotes.filter(n => !n.isPinned).map(note => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onPin={togglePin}
                                onEdit={handleEdit}
                                onDelete={deleteNote}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
