const express = require("express");
const fs = require("fs");
const path = require('path');
const uuid = require('uuid');
const db = require("./db/db.json");
var bodyParser = require('body-parser')

const app = express();
const PORT = 3005;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


// returns index.html file
app.get("/", (req,res) => res.sendFile(path.join(__dirname, './index.html')));

// returns notes.html
app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, './public/notes.html')));


// TODO: read db.json and return all saved notes as json
app.get("/api/notes", (req,res) => {
// res.sendFile(path.join(__dirname, './db/db.json')));
// fs.readFile(`${__dirname}/db/db.json`, (err, data) => { 

//     console.log(data);

//     if(err) {
//         console.log(err);
//     } else {
//     console.log(data.json());
//     return res.json(data);
//     }

//  })
    return res.json(db);
});


// TODO: should receive a new note to save on request body, add it to db.json and return new note to client
// each note needs to be given a unique id when its saved
app.post('/api/notes', (req, res) => { 
    // const newNote = req.body;
    // res.json(newNote);
    console.log(req.body);

    let newNote = {
        title: req.body.title,
        text: req.body.text,
    }
    console.log(newNote);

    data = JSON.stringify(newNote);

     fs.writeFile(`${__dirname}/db/db.json`, data, (err) => {
        if (err)
          console.log(err);
        else {
        //   console.log("File written successfully\n");
        //   console.log("The written has the following contents:");
        //   console.log(fs.readFileSync(`${__dirname}/db/db.json`, "utf8"));
        return res.json(db);
        }
      });
});

// TODO: delete note option

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));