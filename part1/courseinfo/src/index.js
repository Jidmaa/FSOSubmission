import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => 
<p> {props.name} {props.exercises}</p>


const Header = (props) => 
  
  <h1> {props.course}</h1>


const Content = (props) => 
<>
<Part name={props.part[0].name} exercises={props.part[0].exercises} />
<Part name={props.part[1].name} exercises={props.part[1].exercises} />
<Part name={props.part[2].name} exercises={props.part[2].exercises} />
</>

const Total = (props) => <p> Number of exercises : {props.part[0].exercises+props.part[1].exercises+props.part[2].exercises}</p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course}/> 
      <Content part={parts}/>
      <Total  part={parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
