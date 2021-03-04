const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();

let notes = require("./db/db.json");
const { validateNote, writeToFile, findNote, deleteFile } = require('./lib/notes')

const fs = require("fs");
const path = require("path");

// middleware
app.use(express.static('./public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });