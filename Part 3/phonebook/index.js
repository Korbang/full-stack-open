const express = require('express')
const app = express()

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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(note)  
    } else {    
        response.status(404).end()  
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})


app.get('/info', (request, response) => {
    console.log(request);
    const receivedAt = new Date()
    const numberOfPersonsInPhoneBook = persons.length;

    response.send(`
        <p>Phonebook has info for ${numberOfPersonsInPhoneBook} people</p>
        <p>${receivedAt}</p>
    `);
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})