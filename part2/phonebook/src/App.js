import { useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '038365', id: 1 },
    { name: 'John Arbuckle', number: '22776', id: 2 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newId, setNewId] = useState(persons.length + 1)
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: newId
    }

    if (persons.some((person) => person.name === personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`)
    } else {

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setNewId(newId + 1)
    }
    console.log(persons);
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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App