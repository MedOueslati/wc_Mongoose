const mongoose = require("mongoose")
//Create a person with this prototype:
// Define the person schema
const personSchema = mongoose.Schema({
   name: {
    type: String,
    required: true, // Name is a required field
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String], // Array of strings
  },
  // You can add more fields if needed
  // For example:
  // email: {type: String,require: true,
  // },
  // password:{type:String, require:true},
  // address:String
});

// Create the Person model using the personSchema
const Person = mongoose.model("Person", personSchema)

module.exports = Person
