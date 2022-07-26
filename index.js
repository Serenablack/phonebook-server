const express= require("express")

const App=express()
const cors=require("cors")

const persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
App.get("/",(request,response)=>{
    response.send("<h1>Phonebook</h1>")
})
App.get("/persons",(request,response)=>{
    response.json(persons)
    
})
App.get("/info",(request,response)=>{
  console.log(response)
  const date=new Date
  // const time=
  response.send(`<h3>Phonebook has information of ${persons.length} people</h3>
  <h3>${date}</h3>`)
})
App.get("/persons/:id",(req,res)=>{
  const id=Number(req.params.id)
  
  const person=persons.find((x)=> 
  x.id===id)
  if (person) res.json(person)
  else res.status(404).send("No such id found.")
    
  })
  const port=3001
App.listen(port,()=>{console.log(`Server is running on part ${port}`)})
