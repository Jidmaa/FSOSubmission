import React, { useState } from 'react'
import ReactDOM from 'react-dom';
const Persons = ({name, number}) => (
  <>
  {name} {number}
  <br/>
  </>
)
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-55-66-78' },
    { name : 'Jidmus', number: '0699-85-20-20'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('');
  const [ filter, setNewFilter] = useState('');
  
const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name : newName,
      number : newPhone
     }
    
    if (persons.some (e=> { return e.number === newPerson.number})) {

      alert(`${newPerson.number} already belongs to someone`)
      setNewPhone('');
    }
    else {
    if (persons.some (e=> e.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      setNewName('')
    }
    else {
     setPersons(persons.concat(newPerson));
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
  const handleFilter =(event) => {
  setNewFilter(event.target.value);
  
  }
const result = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()));  

  return (
    <div>
      <h2>Phonebook</h2>
    
      <h2>add a new </h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}  />
        </div>
        <div>number: <input value = {newPhone} onChange={handlePhoneChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {result.map (person => <Persons number={person.number} name ={person.name} key ={person.name}/>)}
    
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))