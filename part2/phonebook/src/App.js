import { useEffect, useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newId, setNewId] = useState(0)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')

    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data)
        setNewId(persons.length)
      })
  }, [])
  console.log('render', persons.length, 'persons');


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: newId
    }

    const currentName = persons.find((person) => person.name === personObject.name)

    if (currentName !== undefined) {
      if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(currentName.id, personObject)
          .then(response => {
            setPersons(persons.map((person) => {
              if (person.id !== response.data.id) {
                return person
              } else {
                return response.data
              }
            }))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNewId(newId + 1)
        })
    }
    console.log(persons);
  }

  const removePerson = (id, name) => {
    if (window.confirm(`are you sure you want to delete ${name}?`)) {
      personService
        .remove(id)
        .then((_response) => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(`removed ${name}`);
        })
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App