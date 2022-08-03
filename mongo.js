const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebook-server:${password}@cluster0.3td7lci.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
// personSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
//   })

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
    if (process.argv.length > 3) {
      if (process.argv.length > 5) {
        console.log("Please enclose the name in double quotes.");
      } else {
        const person = new Person({
          name: process.argv[3],
          number: process.argv[4],
        });
        return person.save();
      }
    }
  })
  .then(() => {
    if (process.argv.length > 3 && process.argv.length < 6) {
      console.log(
        `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
      );
    } else if (process.argv.length === 3) {
      return Person.find({}).then((result) => {
        console.log("Phonebook:");
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
      });
    }
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
