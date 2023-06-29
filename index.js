const express = require('express')
const app = express()
app.use(express.json())


let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)


app.get('/', function (req, res) {
    res.send('<h1>Hello manu</h1>')
})

app.get('/api/notes', function (req, res) {
    res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) { response.json(note) }
    else { response.status(404).end("Sivua ei löytyy") }

})


const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

    const note = request.body
    note.id = maxId + 1

    notes = notes.concat(note)

    response.json(notes)
})



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('listening on port ' + port)
})