const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
let noteData = JSON.parse(fs.readFileSync('./db/db.json'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.get('/api/notes', (req, res) => {
    // res.sendFile(path.normalize(__dirname + '/db/db.json'))
    res.json(noteData)
    console.log(noteData)
})

app.post('/api/notes', (req, res) => {
    console.log('[req.body]', req.body)
    req.body.id = uuidv4();
    console.log(req.body)
    noteData.push(req.body)

    fs.writeFileSync('./db/db.json', JSON.stringify(noteData)).res.status(200)
})

app.delete('/api/notes/:id', (req, res) => {
    noteData = (noteData.filter(data => data.id != req.params.id))
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData)).res.status(200)
    res.end()
})

// Can't find a way to link CSS when the page is loaded
// app.get('/notes', (req, res) => {
//     // res.json(noteData)
//     res.sendFile(path.join(__dirname, './public', 'notes.html'));
// })

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));




// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '', 'index.html'));
// })

app.listen(PORT, () => console.log('Server started on PORT', PORT))
