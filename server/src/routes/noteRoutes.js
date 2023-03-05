const express = require('express');
const router = express.Router();

const {
    createNote,
    getAllNotes
} = require('../controller/notesController');

router.post('/create', createNote);
router.get('/:id', getAllNotes);

module.exports = router;