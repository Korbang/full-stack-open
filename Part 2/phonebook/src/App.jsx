import { useState } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import Form from './Form'
import Headline from './Headline'
import { useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)

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
  
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const addPerson = (event) => {   
    event.preventDefault();    
    console.log('button clicked', event.target)

    if (newNumber === "") {
      alert(`Number can be empty`);
      return;
    }

    const nameExists = persons.some(
      person => person.name === newName
    );

    if (nameExists) {
      const hasConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      
      if(!hasConfirmed) {
        return;
      }

      const existingPerson = persons.find(p => p.name === newName);

      const updatedPersonObject = {
        ...existingPerson,
        number: newNumber
      };

      personsService
        .update(updatedPersonObject)
        .then(updatedPerson => {
          setPersons(prevPersons =>
            prevPersons.map(person =>
              person.id === updatedPerson.id
                ? updatedPerson
                : person
            )
          )
          setNewName('')
          setNewNumber('')
          setErrorMessage('Updated user');
          setErrorType('success');
          setTimeout(() => {
            setErrorMessage(null);
            setErrorType(null);
          }, 5000);
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(`Information of ${updatedPersonObject.name} has already been removed`);
          setErrorType('error');
          setTimeout(() => {
            setErrorMessage(null);
            setErrorType(null);
          }, 5000);
        });

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
        setErrorMessage('Added user');
        setErrorType('success');
        setTimeout(() => {
          setErrorMessage(null);
          setErrorType(null);
        }, 5000);
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`Could not add ${newPersonObject.name}`);
        setErrorType('error');
        setTimeout(() => {
          setErrorMessage(null);
          setErrorType(null);
        }, 5000);
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
        setErrorMessage('Deleted user');
        setErrorType('success');
        setTimeout(() => {
          setErrorMessage(null);
          setErrorType(null);
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`Information of ${updatedPersonObject.name} has already been removed`);
        setErrorType('error');
        setTimeout(() => {
          setErrorMessage(null);
          setErrorType(null);
        }, 5000);
      });
      
  };

  return (
    <div>
      <div>debug: {newName}</div>
      <Headline text={"Phonebook"} />
      <Notification message={errorMessage} type={errorType}/>
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
