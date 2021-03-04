const router = require("express").Router();
const { validateNote, writeToFile, findNote, deleteFile } = require('../../lib/notes')
let notes = require("../../db/db.json");

//api routes
router.get('/notes', (req, res) => {
    res.json(notes);
  });

router.get('/notes/:id', (req, res) => {
    let id = req.params.id
    let result = findNote(id)
    res.json(result)
})

router.delete('/notes/:id', (req, res) => {
    let id = req.params.id;
    let note = findNote(id);
    let result = deleteFile(note[0]);
    notes = result;
    res.json(result);
})

router.post('/notes', (req, res) => {

    let result = validateNote(req.body);

    if (result) {
        console.log(req.body);
        writeToFile(req.body)
        res.json(req.body);
    }
    else {
        res.status(400).send("Please add a note title and text!")
    }
});

module.exports = router;