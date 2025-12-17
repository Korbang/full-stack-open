import { useState } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import Form from './Form'
import Headline from './Headline'
import { useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  /*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  */

  useEffect(() => {
    console.log('effect')

    const eventHandler = initalData => {
      console.log('promise fulfilled')
      setPersons(initalData)
    }

    personsService.getAll().then(eventHandler)
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const addPerson = (event) => {   
    event.preventDefault();    
    console.log('button clicked', event.target)

    const nameExists = persons.some(
      person => person.name === newName
    );

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (newNumber === "") {
      alert(`Number can be empty`);
      return;
    }

    const newPersonObject = { 
      name: newName, 
      number: newNumber, 
    };

    personsService
      .create(newPersonObject)
      .then(data => {      
        setPersons(prevItems => [...prevItems, data])
        setNewName('')
        setNewNumber('')
      });

    //const nextId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1;

    //setPersons(prevItems => [...prevItems, { name: newName, number: newNumber, id: nextId}]);
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);

    const hasConfirmed = window.confirm(`Delte ${personToDelete.name}`);

    if(!hasConfirmed) {
      return;
    }

    personsService
      .deletePersonRequest(id)
      .then(data => {
        setPersons(prevPersons =>
          prevPersons.filter(person => person.id !== data.id)
        );
      })
  };

  return (
    <div>
      <div>debug: {newName}</div>
      <Headline text={"Phonebook"} />
      <Filter filter={filter} handler={(e) => setFilter(e.target.value)} />
      <br />
      <Form 
        handleSubmit={addPerson}
        newName={newName}
        handleNewName={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNewNumber={(e) => setNewNumber(e.target.value)}
      />
      <Headline text={"Numbers"} />
      <Persons persons={personsToShow} handle={deletePerson}/>
    </div>
  )
}

export default App
