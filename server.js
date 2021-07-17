const express = require("express");
const fs = require("fs");
const path = require('path');
const uuid = require('uuid');
const db = require("./db/db.json");



const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


// returns index.html file
app.get("/", (req,res) => res.sendFile(path.join(__dirname, './index.html')));

// returns notes.html
app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, './public/notes.html')));


// read db.json and return all saved notes as json
app.get("/api/notes", (req,res) => {
    return res.json(db);
});


// should receive a new note to save on request body, add it to db.json and return new note to client
// each note needs to be given a unique id when its saved
app.post('/api/notes', (req, res) => { 
    console.log(req.body);

    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    }
    console.log(newNote);

    db.push(newNote);

    data = JSON.stringify(db)

     fs.writeFile(`${__dirname}/db/db.json`, data, (err) => {
        if (err)
          console.log(err);
        else {
        return res.json(db);
        }
      });
});

app.delete("/api/notes/:id", (req,res) => {
  for(let i = 0; i < db.length; i++) {
    if (db[i].id == req.params.id) {
      db.splice(i, 1);
      break;
    }
  };

  withDelete = JSON.stringify(db);

  fs.writeFileSync('./db/db.json', withDelete, (err) => {
    if(err) {
      throw err
    } else {
      console.log("DELETED");
    }
  });
    return res.json(db);
})

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));
