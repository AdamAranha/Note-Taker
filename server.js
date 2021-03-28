const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3000;
let noteData = JSON.parse(fs.readFileSync('./db/db.json'))


app.get('/api/notes', (req, res) => {
    // res.sendFile(path.normalize(__dirname + '/db/db.json'))
    res.json(noteData)
    console.log(noteData)
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
