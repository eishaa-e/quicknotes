import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';

const Trash = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchTrashedNotes();
    }, []);

    const fetchTrashedNotes = async () => {
        try {
            const res = await axiosInstance.get('/notes/trash');
            setNotes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const restoreNote = async (note) => {
        try {
            await axiosInstance.put(`/notes/restore/${note._id}`);
            fetchTrashedNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const hardDeleteNote = async (note) => {
        if (!window.confirm("Are you sure you want to permanently delete this note?")) return;
        try {
            await axiosInstance.delete(`/notes/hard-delete/${note._id}`);
            fetchTrashedNotes();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">Trash</h1>

                {notes.length === 0 ? (
                    <p className="text-center text-gray-500">Trash is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map(note => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                isTrash={true}
                                onRestore={restoreNote}
                                onHardDelete={hardDeleteNote}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Trash;
