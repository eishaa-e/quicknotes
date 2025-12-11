const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    isTrashed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
