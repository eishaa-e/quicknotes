import React from 'react';
import { Pen, Trash, Pin, Undo, X } from 'lucide-react';

export default function NoteCard({ note, onEdit, onDelete, onPin, onRestore, onHardDelete }) {
    // Generate a consistent pastel color based on the note ID
    const colors = [
        'bg-blue-100 hover:bg-blue-200 text-blue-800',
        'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
        'bg-red-100 hover:bg-red-200 text-red-800',
        'bg-green-100 hover:bg-green-200 text-green-800',
        'bg-purple-100 hover:bg-purple-200 text-purple-800'
    ];
    const created = new Date(note.createdAt).getTime(); // use timestamp to distribute colors
    const colorClass = colors[created % colors.length];

    return (
        <div className={`p-6 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-64 ${colorClass}`}>
            <div>
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">{note.category || 'General'}</span>
                    <div className="flex gap-1 opacity-100">
                        {onPin && <button onClick={() => onPin(note)} className={`p-2 rounded-full hover:bg-black/5 transition ${note.isPinned ? 'bg-white/50' : ''}`}><Pin size={14} /></button>}
                        {onEdit && <button onClick={() => onEdit(note)} className="p-2 rounded-full hover:bg-black/5 transition"><Pen size={14} /></button>}
                        {onDelete && <button onClick={() => onDelete(note)} className="p-2 rounded-full hover:bg-black/5 transition"><Trash size={14} /></button>}

                        {onRestore && <button onClick={() => onRestore(note)} className="p-2 rounded-full hover:bg-black/5 transition"><Undo size={14} /></button>}
                        {onHardDelete && <button onClick={() => onHardDelete(note)} className="p-2 rounded-full hover:bg-black/5 transition text-red-600"><X size={14} /></button>}
                    </div>
                </div>

                <h4 className="font-bold text-lg mb-2 line-clamp-1">{note.title}</h4>
                <p className="text-sm opacity-80 leading-relaxed line-clamp-4">{note.content}</p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-black/5">
                <span className="text-xs opacity-60 font-medium">{new Date(note.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
        </div>
    );
}
