import React from 'react';

export default function NoteCard({ note, onEdit, onDelete, onPin, onRestore, onHardDelete }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-semibold text-slate-800">{note.title || 'Untitled'}</h4>
                    <p className="text-sm text-slate-600 mt-1">{note.category || 'General'}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => onPin && onPin(note)} className="text-xs px-2 py-1 rounded bg-yellow-50 border"> {note.isPinned ? 'Unpin' : 'Pin'} </button>
                    {note.isTrashed ? (
                        <>
                            <button onClick={() => onRestore && onRestore(note)} className="text-xs px-2 py-1 rounded bg-green-50 border">Restore</button>
                            <button onClick={() => onHardDelete && onHardDelete(note)} className="text-xs px-2 py-1 rounded bg-red-50 border text-red-600">Delete</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => onEdit && onEdit(note)} className="text-xs px-2 py-1 rounded bg-sky-50 border">Edit</button>
                            <button onClick={() => onDelete && onDelete(note)} className="text-xs px-2 py-1 rounded bg-red-50 border text-red-600">Trash</button>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-3 text-sm text-slate-700">
                {note.content ? note.content.slice(0, 200) : <em className="text-slate-400">No content</em>}
            </div>

            <div className="mt-3 text-xs text-slate-500 flex justify-between">
                <div>{new Date(note.createdAt || Date.now()).toLocaleString()}</div>
                <div>{note.isPinned ? '📌 Pinned' : ''}</div>
            </div>
        </div>
    );
}
