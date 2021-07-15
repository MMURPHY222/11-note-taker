const express = require("express");
const fs = require("fs");
const path = require('path');
const uuid = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// returns index.html file
app.get("/", (req,res) => res.sendFile(path.join(__dirname, '../../index.html')));

// returns notes.html
app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, '../../notes.html')));

// TODO: read db.json and return all saved notes as json
app.get("/api/notes", (req,res) => {
    fs.readFile(`${__dirname}/db.json`, (err, data) => { 


    })
})

// TODO: should receive a new note to save on request body, add it to db.json and return new note to client
// each note needs to be given a unique id when its saved
app.post('/api/notes', (req, res) => { 
    const newNote = req.body;
    res.json(newNote);
});

// TODO: delete note option

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));