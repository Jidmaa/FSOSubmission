import React from 'react';
import logo from './logo.svg';
import './App.css';

const Hello = ({name}) =><div> <p> Hello {name} !</p> </div>
function App() {
  return (
    <div >
    <h1> Greetings people </h1>
    <Hello name="Majid"/> 
    </div>
  );
}

export default App;
