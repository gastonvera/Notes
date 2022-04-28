const { send } = require('express/lib/response');
const router = require('express').Router();
const Note = require('../models/Note');

//Get form notes
router.get('/notes/add', (req, res) => {
    res.render('notes/new-note')
});

//Post notes
router.post('/notes/new-note', async (req, res) => {
    const { title, content } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!content) {
        errors.push({ text: 'Please add some content' });
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors, title, content
        });
    } else {
        const newNote = new Note({ title, content });
        await newNote.save();
        req.flash('success_msg', 'Note added successfully');
        res.redirect('/notes');
    }
});

//Get all notes
router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'}).lean();
    res.render('notes/all-notes', { notes });
});

//Update form notes
router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
});

//Update note
router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, content } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,content});
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
});

//Delete note
router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note deleted successfully');
    res.redirect('/notes');
});

module.exports = router;