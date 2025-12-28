require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
}

app.use(express.static('frontend/dist'))

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
      "name": "Mary Poppendiec", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    if(id === undefined) {
        return response.status(400).send({ error: 'id is undefined' })
    }

    Person
        .findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    if(id === undefined) {
        return response.status(400).send({ error: 'id is undefined' })
    }

    Person.findByIdAndDelete(id)
        .then(result => {
            if (result === null) {
                return response.status(404).json({ error: 'person not found' })
            }
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    if(id === undefined) {
        return response.status(400).send({ error: 'id is undefined' })
    }

    const { name, number } = request.body

    const person = { name, number }

    Person.findByIdAndUpdate(
        id,
        person,
        { new: true, runValidators: true }
    )
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    console.log(request);
    const receivedAt = new Date()

    Person
        .countDocuments({})
        .then(numberOfPersonsInPhoneBook => {
            response.send(`
                <p>Phonebook has info for ${numberOfPersonsInPhoneBook} people</p>
                <p>${receivedAt}</p>
            `)
        })
        .catch(error => next(error))
})

app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.resolve('frontend/dist/index.html'))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })  
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})