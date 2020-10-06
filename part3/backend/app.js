const { res, response } = require('express')
var express = require('express')
var fs = require('fs')
var path= require('path')
var morgan = require('morgan')
var app = express()
const cors = require('cors')
require('dotenv').config()


const Person = require('./modules/person')    
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
// let numbers = [  {    id: 1,    name: "Arto Hellas",    number: "02023478"  },  
// {    id: 2,    name: "John Doe",    number: "045248978"  },
// {    id: 3,    name: "Jane Doe",    number: "01238798"  }
// ]
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('tiny', { stream: accessLogStream }))

app.get('/', (req, res)=> {
  res.send('Hello Za Warudo')
})
app.get('/api/persons', (req, res)=> {
  Person.find({}).then(persons => res.json(persons) )
    
})

app.get('/api/persons/:id', (req, res, next)=> {
    
  Person.findById(req.params.id).then(persons => {
    if (persons) {
      res.json(persons)
    }
    else {
      res.status(404).end()
    }
  } )
    .catch(error=> next(error))
})
app.get('/info', (req, res)=> {
  let date_ob = new Date()
  const entries = Person.length/3
  res.send(`Phonebook has info for ${entries} people <br/> <br/> ${date_ob}`)
})
app.delete('/api/persons/:id', (req, res, next)=> {
  Person.deleteOne({ _id: req.params.id }).then(result => { res.status(204).end()})
    .catch(error => next(error))
   
})

app.post('/api/persons', (req, res, next)=> {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({ 
      error: 'Name is missing' 
    })
  }
  if (!body.number) {
    return res.status(400).json({ 
      error: 'Phone number is missing' 
    })
  }

  const person = new Person ({
        
    name: body.name,
    number: body.number
        
  })
  person.save().then( savedPerson => {
    console.log(`added ${person.name} number : ${person.number} to the phonebook`)
    res.json(savedPerson.toJSON())

  })
    .catch(error => next(error))
    
   
   
})
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)  
const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {   return res.status(400).json({ error: error.message })
  } 
  
  next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})