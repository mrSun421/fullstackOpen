/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((_result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (number) => {
        console.log("number.length", number.length);
        const lengthCheck = number.length >= 8;
        if (!lengthCheck) {
          return false;
        }

        const splitNumber = number.split("-");
        console.log("splitNumber", splitNumber);
        console.log("splitNumber.length", splitNumber.length);

        if (splitNumber.length !== 1 && splitNumber.length !== 2) {
          return false;
        }

        if (splitNumber.length === 2) {
          console.log("splitNumber[0].length", splitNumber[0].length);
          return splitNumber[0].length === 2 || splitNumber[0].length === 3;
        }

        return true;
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
  },
  id: String,
});

personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);
