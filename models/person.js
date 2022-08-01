const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebook-server:${password}@cluster0.3td7lci.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: Date,
  
})
// personSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
//   })

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
if(process.argv.length>2){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
})}

    return person.save()
  })
  .then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))