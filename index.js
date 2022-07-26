const express= require("express")

const App=express()

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
const port=3001
App.get("/persons/:id",(req,res)=>{const id=req.params.id
    res.json(persons.id)

})
App.listen(port,()=>{console.log(`Server is running on part ${port}`)})