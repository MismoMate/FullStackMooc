import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/entries'

const App = () => {
  

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setNewSearchValue] = useState('')
  const [match, setMatch] = useState(false)

  useEffect(() => {
    console.log('effect')
    phonebookService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()   
    const duplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (!duplicate) {
      let newObject = {name: newName, number: newNumber}
      phonebookService
        .create(newObject)
        .then(returnObject => {
            setPersons(persons.concat(returnObject))
            setNewName('')
            setNewNumber('')
        })
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

  const handleDeletion = (id) => {
    console.log("deleting entry", id)
    phonebookService
        .deleteEntry(id)
        .then(response => {
          setPersons(persons.filter(person => person.id != id))
        })
        .catch(() => {
          alert(`the note ${id} was deleted`)
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
      <Persons persons={persons} handleDeletion={handleDeletion} /> 
              
    </div>
  )
}


export default App
