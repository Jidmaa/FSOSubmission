import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import PersonService from './services/persons.js'
import './index.css'
const Notification = ({message}) => {
  if (message === '') {
      return null 
  }
  return (
    <div className="success"> 
    {message}
    </div>
  )
}
const Filter = ({ handleFilter }) => {
  return (
    <div>
      Filter shown with : <input onChange={handleFilter} />
    </div>
  )
}
const PersonForm = ({ newName, setNewName, newPhone, setNewPhone, handleNameChange, handlePhoneChange, addName }) => {
  return (<>
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>)

}
const Persons = ({ result, handleDelete }) => {

  return (
    <>
      <ul>
        {result.map(person => <li key={person.name} > {person.name + ' ' + person.number} <button name= {person.name} value={person.id} onClick={handleDelete}> Delete </button> </li>)}
      </ul>
      <br />
    </>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('');
  const [filter, setNewFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState ('')
  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newPhone
    }
  const successMsg = `${newPerson.name} has successfuly been added to the phonebook ! `
  const updateMsg = `${newPerson.name} has successfully been updated`
  //Checking if the phone number doesnt' belong to someone already 
  if (persons.some(e => e.number === newPerson.number && e.number !== '')) {

      alert(`${newPerson.number} already belongs to someone`)
      setNewPhone('');
    }
    else {
    if (newPerson.number==="" || isNaN(newPerson.number)) {
      alert('Please input a valid number')
      setNewPhone('');
      return
    }
    //Checking if the person's name isn't already in the phonebook
    if (persons.some(e => e.name === newPerson.name)) {
      if (  window.confirm(`${newPerson.name} is already added to the phonebook, want to replace his/her number ?`) )
      {
      const person = persons.filter (p => p.name=== newPerson.name);
      
      const changedPerson = {name: newName , number: newPhone, id: person[0].id};
      
      
      PersonService
      .update(changedPerson.id, changedPerson)
      .then(()=>{
        PersonService.getAll()
        .then(response => {
          setPersons(response)
          setSuccessMessage(updateMsg)
          setTimeout(() => {
            setSuccessMessage('')
          }, 5000)
        })}  )     
      }
    }
      else {
      

       PersonService
       .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setSuccessMessage(successMsg)
          setTimeout(() => {
            setSuccessMessage('')
          }, 5000)
          setNewPhone('')
          setNewName('')
        })
  
        setNewName('');
        setNewPhone('');
      }
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }
  const handleDelete = (event) => {
    if (window.confirm(`Do you really want to delete ${event.target.name} from the phonebook ?`))
  {
    PersonService
    .del(event.target.value)
    .then(() => {
      PersonService.getAll()
      .then(response => {
        setPersons(response)
      })})
    }
  
  }
  const result = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()));
  useEffect(() => {
    PersonService
    .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new </h2>

      <PersonForm handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addName={addName}
        newName={newName}
        newPhone={newPhone}
        setNewName={setNewName}
        setNewPhone={setNewPhone} />

      <h2>Numbers</h2>
      <Persons result={result} handleDelete={handleDelete}/>


    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))