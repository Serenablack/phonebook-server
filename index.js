const express= require("express")
const morgan=require("morgan")
const App=express()
const cors=require("cors")

App.use(express.static("build"))
App.use(cors())
App.use(express.json())
App.use(morgan((tokens,req,res)=>{
  return[tokens.method(req,res),
    tokens.url(req,res),
    tokens.status(req,res),
  tokens.res(req,res,"content-length"),"-",
tokens['response-time'](req,res),'ms',
JSON.stringify(req.body)].join(' ')
}))

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": 
      "040-123456"
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

 App.post("/persons/",(req,res)=>{
    const personObj=req.body
    if (personObj.name==="" || personObj.number==="" ){
    res.status(404).json({error:"The name or number is missing."})
    } else if (persons.filter((x)=>x.name===personObj.name).length!==0){
    res.status(404).json({error:"The name must be unique."})}
    else{
    personObj.id=Math.floor(Math.random()*1000000)
    persons.push(personObj)
    res.json(persons)
  }})

  App.delete("/persons/:id",(req,res)=>{
    const id=Number(req.params.id)
    const delPerson=persons.filter((x)=>x.id!==id)
    res.json(delPerson)
  })

const port=process.env.PORT || 3001
App.listen(port,()=>{console.log(`Server is running on part ${port}`)})
