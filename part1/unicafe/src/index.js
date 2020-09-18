import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) => (
  <button onClick = {handleClick}> 
  {text}
  
   </button>
)
const Statistic = ({text, value}) => (
    <>

    <tr>
      <td>{text}</td> 
      <td>{value}</td> 
    </tr>
    
    </>
  )

const Statistics = ({good,bad,neutral}) => {
  const All = good+bad+neutral;
  const Avg = (good-bad)/(good+bad+neutral);
  const Pos = (good)/(good+bad+neutral)*100;
  if (All===0) {
    return( <> Cannot retrieve Statistics, no feedback has been gathered </>)
  }
  else {
   return (
    <>
    <table>
      <tbody>
      <Statistic text="good :" value= {good}/>
       
      <Statistic text="neutral :" value= {neutral}/> 
       
      <Statistic text="bad :" value= {bad}/> 
        
      <Statistic text="All :" value= {All}/>
        
      <Statistic text="Average :" value= {Avg}/>
        
      <Statistic text="Positive :" value= {Pos.toString()+'%'}/> 
      </tbody>
    </table>
    </>
      )
   }
  }
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setGoodValue = (newValue) => {
    setGood(newValue);
  }
  const setNeutralValue = (newValue) => {
    setNeutral(newValue);
  }
  const setBadValue = (newValue) => {
    setBad(newValue);
  }

  return (
    <div>
      <h1> Give feedback </h1>
      <Button handleClick={() => setGoodValue(good+1)} text="good"/>
      <Button handleClick={() => setNeutralValue(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBadValue(bad+1)} text="bad"/>
      <h1> Statistics : </h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div> 
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
