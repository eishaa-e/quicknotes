import { FaThumbtack, FaTrash, FaEdit, FaUndo, FaTimes } from 'react-icons/fa';

const NoteCard = ({ note, onPin, onEdit, onDelete, onRestore, onHardDelete, isTrash = false }) => {
    return (
        <div className={`bg-white p-4 rounded shadow-md relative group hover:shadow-lg transition ${note.isPinned ? 'border-2 border-yellow-400' : ''}`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{note.title}</h3>
                {!isTrash && (
                    <button onClick={() => onPin(note)} className={`text-gray-400 hover:text-yellow-500 ${note.isPinned ? 'text-yellow-500' : ''}`}>
                        <FaThumbtack />
                    </button>
                )}
            </div>
            <p className="text-gray-600 whitespace-pre-wrap mb-4">{note.content}</p>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{note.category}</span>

            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                {isTrash ? (
                    <>
                        <button onClick={() => onRestore(note)} className="text-green-500 hover:text-green-600" title="Restore">
                            <FaUndo />
                        </button>
                        <button onClick={() => onHardDelete(note)} className="text-red-500 hover:text-red-600" title="Permanent Delete">
                            <FaTimes />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => onEdit(note)} className="text-blue-500 hover:text-blue-600" title="Edit">
                            <FaEdit />
                        </button>
                        <button onClick={() => onDelete(note)} className="text-red-500 hover:text-red-600" title="Move to Trash">
                            <FaTrash />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NoteCard;
