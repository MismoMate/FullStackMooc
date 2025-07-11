require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('tinyDinger', (tokens, req, res) => {
  let log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-', 
    tokens['response-time'](req, res), 'ms'
  ].join(' ')

  if (req.method === 'POST') {
    log += " " + JSON.stringify(req.body)
  }

  return log
})

app.use(morgan('tinyDinger'))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send("<h1>Phonebook</h1>")
})


app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => res.json(result)).catch(err => next(err))
})

app.get('/api/info', (req, res, next) => {
  const date = Date.now()
  Person.find({})
    .then((result) => {
      res.send(`<h2>Phonebook has info for ${result.length} people</h2>\n<h2>${new Date(date).toString()}</h2> `)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  // const createId = () => {
  //   const max = 10000
  //   const min = 0
  //   return Math.floor(Math.random() * (max - min + 1) ) + min
  // }

  const p = req.body
  if (!('name' in p) || !('number' in p) ) {
    res.status(400).json({ error: 'Either a name, number, or both fields are missing' })
    return 
  }    
  const person = new Person(p)
  person.save().then(savedPerson => res.json(savedPerson)).catch(err => next(err))
    
})

app.put('/api/persons/:id', (req, res, next) => {
  const p = req.body
  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).end()
      }
      
      person.name = p.name
      person.number = p.number
      
      return person.save().then(updatedPerson => res.json(updatedPerson))
      
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  
  if (err.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }
}

app.use(errorHandler)

// still have to test exerices 3.15-18 

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is running on port ${PORT}...` ) )
