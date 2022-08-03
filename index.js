const express = require("express");
const morgan = require("morgan");
const App = express();
const cors = require("cors");
const Person = require("./models/person");

App.use(express.static("build"));
App.use(cors());
App.use(express.json());
App.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

// let persons=[
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number":
//       "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]

App.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

App.get("/persons", (request, response) => {
  console.log(Person);
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

App.get("/info", (request, response) => {
  console.log(response);
  const date = new Date();
  Person.find({}).then((person) => {
    response.send(`<h3>Phonebook has information of ${person.length} people</h3>
  <h3>${date}</h3>`);
  });
});

App.get("/persons/:id", (req, res, next) => {
  // const id=Number(req.params.id)
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).send("No such id found.");
    })
    .catch((error) => next(error));
});

App.post("/persons/", (req, res, next) => {
  const personObj = req.body;
  Person.find({ name: personObj.name })
    .then((result) => {
      if (result.length !== 0) {
        res.status(400).send("the name must be unique.");
      } else {
        if (personObj.name === "" || personObj.number === "") {
          res.status(404).json({ error: "The name or number is missing." });
        } else {
          const person = new Person({
            name: personObj.name,
            number: personObj.number,
          });
          person
            .save()
            .then((savedPerson) => res.json(savedPerson))
            .catch((error) => next(error));
        }
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
  // personObj.id=Math.floor(Math.random()*1000000)
  // persons.push(personObj)
  // res.json(persons)
});

App.delete("/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).end())
    .catch((err) => next(err));

  // const id=Number(req.params.id)
  // const delPerson=persons.filter((x)=>x.id!==id)
  // res.json(delPerson))
});

App.put("/persons/:id", (req, res, next) => {
  const personElem = req.body;
  const person = {
    name: personElem.name,
    number: personElem.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    // ,
    // runValidators: true,
    // context: "query",
  }).then((updatedPerson) => {
    res.json(updatedPerson);
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

App.use(errorHandler);

const port = process.env.PORT || 3001;
App.listen(port, () => {
  console.log(`Server is running on part ${port}`);
});
