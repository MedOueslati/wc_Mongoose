const express = require("express")
const router = express.Router()
const Person = require("../Models/personSchema")

//(1) Create and Save a Record of a Model:
// POST route to create and save a record
router.post("/createPerson", async (req, res) => {
  // Extract data from the request body
  const { name, age, favoriteFoods } = req.body
  // Create a new instance of the Person model
  const newPerson = new Person({
    name,
    age,
    favoriteFoods,
  })
  try {
    // Save the record to the database using async/await
    const savedPerson = await newPerson.save()
    // Person saved successfully
    res.status(200).json({msg :"success",savedPerson})
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg:err.message})
  }
});

//(2)Create Many Records with model.create()
// POST route to create and save multiple records
router.post("/createManyPeople", async (req, res) => {
  try {
    // Extract an array of people from the request body
    const arrayOfPeople = req.body
    // Use Model.create() to save the array of people to the database
    const createdPeople = await Person.create(arrayOfPeople)
    // People created successfully
    res.status(200).json({msg :"success",createdPeople})
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: err.message })
  }
});

// (3) Use model.find() to Search Your Database
// GET route to find all people with a given name
router.get("/findPeopleByName/:name", async (req, res) => {
  const searchName = req.params.name

  try {
    // Use Model.find() to search for people with the given name
    const people = await Person.find({ name: searchName })
    // People found successfully
    res.status(200).json({msg :"success",people})
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: err.message })
  }
})

//(4) Use model.findOne() to Return a Single Matching Document from Your Database
// GET route to find one person with a certain food
router.get("/findOnePersonByFood/:food", async (req, res) => {
  const searchFood = req.params.food
  try {
    /// Use Model.findOne() to search for one person with the given food in favorites
    const person = await Person.findOne({ favoriteFoods: searchFood })

    // Person found successfully
    res.status(200).json({msg :"success",people})
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Error finding person" })
  }
})

//(5) Use model.findById() to Search Your Database By _id
// GET route to find a person by _id
router.get("/findPersonById/:personId", async (req, res) => {
  const personId = req.params.personId
  try {
    // Use Model.findById() to search for a person by _id
    const person = await Person.findById(personId)
    if (!person) {
      // If no person is found with the given _id
      return res.status(404).json({ error: "Person not found" })
    }
    // Person found successfully
    res.status(200).json({msg :"success",person})
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: err.message })
  }
})
//(6)Perform Classic Updates by Running Find, Edit, then Save
// GET route to find a person by _id, edit, and then save
router.get("/findPersonById/:personId", async (req, res) => {
  const personId = req.params.personId;

  try {
    // Use Model.findById() to search for a person by _id
    const person = await Person.findById(personId);
    
    if (!person) {
      // If no person is found with the given _id
      return res.status(500).json({ error: "Person not found" });
    }

    // Add "hamburger" to the list of favoriteFoods
    person.favoriteFoods.push("hamburger");

    // Save the updated person
    await person.save();

    // Person found and updated successfully
    res.status(200).json({ msg: "success", updatedPerson: person });
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: err.message });
  }
});
// PUT route to update a person's age by name
router.put("/updatePersonAgeByName/:personName", async (req, res) => {
  const personName = req.params.personName;

  try {
    // Use Model.findOneAndUpdate() to update a person's age by name
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { $set: { age: 20 } },
      { new: true } // Return the updated document
    );

    // Person updated successfully
    res.status(200).json({ msg: "success", updatedPerson });
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: err.message });
  }
});

// Delete One Document Using model.findByIdAndRemove
// DELETE route to remove a person by _id
router.delete("/removePersonById/:personId", async (req, res) => {
  const personId = req.params.personId;

  try {
    // Use Model.findByIdAndRemove() to delete a person by _id
    const removedPerson = await Person.findByIdAndRemove(personId);

    // Person removed successfully
    res.status(200).json({ msg: "success", removedPerson });
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: err.message });
  }
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()
// DELETE route to remove all people with the name "Mary"
router.delete("/removePeopleByName/Mary", async (req, res) => {
  try {
    // Use Model.remove() to delete all people with the name "Mary"
    const result = await Person.remove({ name: "Mary" });

    // People removed successfully
    res.status(200).json({ msg: "success", result });
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: err.message });
  }
});


// Chain Search Query Helpers to Narrow Search Results
// GET route to find people who like burritos, sort by name, limit to two, and hide age
router.get("/findBurritoLovers", async (req, res) => {
  try {
    Mongose
    const burritoLovers = await Person.find({ favoriteFoods: "burritos" })
      .sort("name")
      .limit()
      .select("-age")
      .exec();

    // Burrito lovers found successfully
    res.status(200).json({ msg: "success", burritoLovers });
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;