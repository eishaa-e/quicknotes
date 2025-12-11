const Note = require('../models/note.model');

const createNote = async (noteData) => {
    const note = await Note.create(noteData);
    return note;
};

const getNotes = async (userId) => {
    // Return notes that are not trashed
    return await Note.find({ userId, isTrashed: false }).sort({ isPinned: -1, updatedAt: -1 });
};

const updateNote = async (id, userId, updateData) => {
    const note = await Note.findOne({ _id: id, userId });
    if (!note) throw new Error('Note not found');

    Object.assign(note, updateData);
    return await note.save();
};

const moveToTrash = async (id, userId) => {
    const note = await Note.findOne({ _id: id, userId });
    if (!note) throw new Error('Note not found');

    note.isTrashed = true;
    return await note.save();
};

const getTrashedNotes = async (userId) => {
    return await Note.find({ userId, isTrashed: true }).sort({ updatedAt: -1 });
};

const restoreFromTrash = async (id, userId) => {
    const note = await Note.findOne({ _id: id, userId });
    if (!note) throw new Error('Note not found');

    note.isTrashed = false;
    return await note.save();
};

const hardDeleteNote = async (id, userId) => {
    const note = await Note.findOneAndDelete({ _id: id, userId });
    if (!note) throw new Error('Note not found');
    return note;
};

const searchNotes = async (userId, query) => {
    return await Note.find({
        userId,
        isTrashed: false,
        $or: [
            { title: { $regex: new RegExp(query, 'i') } },
            { content: { $regex: new RegExp(query, 'i') } },
            { tags: { $regex: new RegExp(query, 'i') } } // search in tags too
        ]
    }).sort({ isPinned: -1, updatedAt: -1 });
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    moveToTrash,
    getTrashedNotes,
    restoreFromTrash,
    hardDeleteNote,
    searchNotes,
};
