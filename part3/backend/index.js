const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
let numbers = [  {    id: 1,    name: "Arto Hellas",    number: "02023478"  },  
{    id: 2,    name: "John Doe",    number: "045248978"  },
{    id: 3,    name: "Jane Doe",    number: "01238798"  }
]
app.get('/', (req, res)=> {
    res.send("Hello Za Warudo")
})
app.get('/api/persons', (req, res)=> {
    res.json(numbers)
})
app.get('/api/persons/:id', (req, res)=> {
    const id = Number(req.params.id)
    const number = numbers.find (number => number.id ===id)
    if (number){
    res.json(number)
    }
    else {
        res.status(404).end()
    }
})
app.get("/info", (req, res)=> {
    let date_ob = new Date();
    const entries = numbers.length;
    res.send(`Phonebook has info for ${entries} people <br/> <br/> ${date_ob}`)
})
app.delete('/api/persons/:id', (req, res)=> {
    const id = Number(req.params.id)
    numbers = numbers.filter(number => number.id !==id)
    res.status(204).end()
})
const generateId = () => {
    const maxId = numbers.length > 0
      ? Math.floor((Math.random()*1000000)+1)
      : 0
    return maxId + 1
  }
app.post('/api/persons', (req, res)=> {
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
    if (numbers.find(number => body.name===number.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
          })
    }
      
    const number = {
        id: generateId(),
        name: body.name,
        number: body.number
        
    }
    numbers = numbers.concat(number)
    res.json(number)
   
   
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})