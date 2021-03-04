const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();

const notes = require('./db/db.json');

const fs = require("fs");
const path = require("path");

// middleware
app.use(express.static('./public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

//api routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

app.get('/api/notes', (req, res) => {
    let id = req.params.id
    let result = findNote(id)
    res.json(result)
})

app.post('/api/notes', (req, res) => {

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

//html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, ".public/notes.html"))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, ".public/index.html"))
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });