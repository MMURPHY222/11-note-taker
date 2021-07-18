# 11-note-taker

## User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Usage

```
This app functions as a note taker app. It allows users to enter notes into a designated area with titles and text, they are then saved in a list on the left showing their titles, and users can click into them again from that list. They are also able to delete notes with a a delete button that is populated onto each note in the list on the left side of the screen.
```

## Functionality 

```
The starter code was given to us, and we were required to create the server.js with the correct get, post, and delete requests.
```
The three get requests are as follows 

```javascript
// returns index.html file
app.get("/", (req,res) => res.sendFile(path.join(__dirname, './index.html')));

// returns notes.html
app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, './public/notes.html')));


// read db.json and return all saved notes as json
app.get("/api/notes", (req,res) => {
    return res.json(db);
});
```
The file path to db was required and saved as a variable to allow for easy reference to it and the contents within. It is important that the content within that file is saved as an array, because the front end used array methods to access and post the data within it. 

The post request is

```javascript
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
```
It receives a new note to save on request body, adds it to db.json and return new note to client. I also imported uuid and used it to add a unique id to each note when its saved.

The delete request 

```javascript
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

```

This gives users the functionality to delete notes from the list with the delete button. It works by looping through the array within db.json and looking to match ids from that file with the id from the note that was requested. It then uses the array method splice to cut that single object from the array, then stringifys the array again and rewrites the db.json file with the updated array. 

## Video of application
https://drive.google.com/file/d/1OTgFeSS90uvRHrE1GxQRvEaQZPEsMNqH/view