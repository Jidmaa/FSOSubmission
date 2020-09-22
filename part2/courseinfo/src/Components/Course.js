import React from 'react';
const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ part }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises;
    const sum = part.reduce(reducer,0);
    
    return(
      <p> <strong> Total of {sum} exercises </strong> </p> 
    ) 
  }
  
  const Part = ({name,exercises}) => {
    return (
      <p>
        {name} {exercises} 
      </p>    
    )
  }
  
  const Content = ({ part }) => {
    return (
      <div>
        <Part name={part.name} exercises={part.exercises} />
        
       
      </div>
    )
  }
  const Course = ({courses}) => 
    (
    <div>
       <Header course={courses}/>
       {courses.parts.map((cours) => 
       <Content part={cours} key={cours.id} />)}
       <Total part = {courses.parts}/> 
    </div>
    )
export default Course