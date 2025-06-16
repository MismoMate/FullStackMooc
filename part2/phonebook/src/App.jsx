import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setNewSearchValue] = useState('')
  const [match, setMatch] = useState(false)


  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()   
    const duplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (!duplicate) {
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }    
  }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase()
    setMatch(false)
    setNewSearchValue(value)
    // add functionality that matches
    persons.map(person => {
      if (person.name.toLowerCase().includes(value) && value !== '') {
        setMatch(true)
        return     
      } 
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter text='Search Phonebook' inputValue={searchField} onChange={handleSearch} phonebook={persons} match={match} />
      
      <h2>Add a new entry</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange} 
                  numberValue={newNumber} onNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} /> 
              
    </div>
  )
}


export default App
