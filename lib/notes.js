const fs = require("fs");
const path = require("path");
const notes = require('./db/db.json');
const { nanoid } = require("nanoid");

function validateNote(note) {
    if (note.title === "" || !note.title) {
        return false
    }
    if (note.text === "" || !note.text) {
        return false
    }
    return true
}

function  writeToFile(note) {
    const newNote = note;
    newNote.id = nanoid();
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.strigify(notes, null, 2)
    );
}

function findNote(id) {
    const result = notes.filter(note => {
        if (note.id === id) {
            return note
        }
    });
    return result
}

module exports = {
    validateNote,
    writeToFile,
    findNote
}