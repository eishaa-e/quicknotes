const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All note routes are protected

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.put('/:noteId', noteController.updateNote);
router.delete('/:noteId', noteController.deleteNote);
router.get('/trash', noteController.getTrash);
router.put('/restore/:noteId', noteController.restoreNote);
router.delete('/hard-delete/:noteId', noteController.hardDelete);

module.exports = router;
