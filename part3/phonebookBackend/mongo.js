const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackDB:${password}@cluster0.ghsuraj.mongodb.net/personApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(
      Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      })
    )
    .catch((err) => {
      console.log(err);
    });
}

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: name,
        number: number,
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${name} with number ${number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

console.log(`${process.argv.length} is an invalid number of arguments`);
console.log("please format as such:");
console.log('node mongo.js <password> <name> <number>');