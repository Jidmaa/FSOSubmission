import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'
const ShowCountries = ({countries, setCountries, searchedCountries, setSearchedCountries}) => {
 
  
  const filteredCountries =countries.filter(country => country.name.toLowerCase().includes(searchedCountries.toLocaleLowerCase()))
  
  if (filteredCountries.length < 10){ 
   if (filteredCountries.length ===1) {
    return ( <div>
       <h1> {filteredCountries[0].name} </h1>
          Capital : {filteredCountries[0].capital}
          <br/>
          Population : {filteredCountries[0].population}
          <br/>
          <h1> Languages :</h1>
          <ol>
          {filteredCountries[0].languages.map(language => <li key={language.name}>  {language.name} </li>)}
          </ol>
          <br/>
          <h1> Flag : </h1>
          <img src ={filteredCountries[0].flag} width='300'  alt='country flag'></img>
        </div>)
    
  }
   else {
  return (
    <div>
    {
    filteredCountries
    .map(country => <li key={country.name}> {country.name}  </li>)} 
      </div>
  )
  }
}
    else return (<div> <br/> <h1> Too many countries to show !</h1>  </div>)

}

const App = () => {
  useEffect(() =>{ axios.get('https://restcountries.eu/rest/v2/all')
.then(response => {setCountries(response.data)})},[])
 const handleSearch = (event) => {
  setSearchedCountries(event.target.value)
 }
 
  const [countries, setCountries]= useState([])
  const [searchedCountries,setSearchedCountries] = useState('');
  
  
  return (
    <div>
    Find countries <input onChange={handleSearch} value={searchedCountries}/> 
    <br/> 
  
    <ShowCountries setCountries={setCountries} setSearchedCountries={setSearchedCountries} countries={countries} searchedCountries={searchedCountries} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))

