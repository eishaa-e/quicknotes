const noteService = require('../services/note.service');

const createNote = async (req, res) => {
    try {
        const note = await noteService.createNote({
            ...req.body,
            userId: req.user._id
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await noteService.getNotes(req.user._id);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await noteService.updateNote(req.params.noteId, req.user._id, req.body);
        res.json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await noteService.moveToTrash(req.params.noteId, req.user._id);
        res.json({ message: 'Note moved to trash', note });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getTrash = async (req, res) => {
    try {
        const notes = await noteService.getTrashedNotes(req.user._id);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const restoreNote = async (req, res) => {
    try {
        const note = await noteService.restoreFromTrash(req.params.noteId, req.user._id);
        res.json({ message: 'Note restored', note });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const hardDelete = async (req, res) => {
    try {
        await noteService.hardDeleteNote(req.params.noteId, req.user._id);
        res.json({ message: 'Note permanently deleted' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const searchNotes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }
        const notes = await noteService.searchNotes(req.user._id, query);
        res.json({ notes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    getTrash,
    restoreNote,
    hardDelete,
    searchNotes,
};
