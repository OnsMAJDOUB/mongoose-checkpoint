//require 
const express = require('express');

//get instance of express
const app = express();


// create body parser middleeware 
app.use(express.json());

require("dotenv").config();
//create PORT
const PORT = process.env.PORT || 5002;

// crete server   
app.listen(PORT,(err)=>{
    err
      ? console.log(err)
      : console.log(`server is running on http://127.0.0.1:${PORT}`)
}  
)


// require connectDB
const connectDB = require("./config/connectDB")
connectDB();   

// defines person schema 
// require mongoose 
const mongoose= require('mongoose');
//create person schema 
const personSchema = new mongoose.Schema({
name: {
  type: String,
  required: true
},
age: Number,
email:{
  type: String,
  required:true,
  unique: true,
},
favoriteFoods: [String],
},
{
  collection:"persons"
},
{
  timestamps: true 
}
);
// create person model
const Person = mongoose.model('person', personSchema)
// create a new person 
const onePerson = {
  name: "Jhon",
  age: 37,
  email: "john@gmail.com",
  favoriteFoods:["pasta","lasagne"]

}
// create one person 
const createOnePerson = async (newPerson) => {
try {
  const savedPerson= await Person.create(newPerson);
  console.log("person saved successfully", savedPerson)
  
} catch (error) {
  console.log("error in saving person", error)
  
}
}
//call the function createOnePerson 
// createOnePerson(onePerson);

// create many persons 
const createManyPersons = async (newPersons) => {
try {
  const savedPerson= await Person.insertMany(newPersons);
  console.log("person saved successfully", savedPerson);
  
} catch (error) {
  console.log("error in saving person", error)
  
}
}
const personArray = [{
  name: "Mary",
  age:28,
  email: "Mary@gmail.com",
  favoriteFoods:["kouskous","pasta"]
},
{
  name: "Mary",
  age:25,
  email: "Mary@gmail.com",
  favoriteFoods:["pizza","lasagne"]
},
{
  name: "mohamed",
  age:22,
  email: "mohamed@gmail.com",
  favoriteFoods:["kafteji","riz"]
},
{
  name: "ahmed",
  age:35,
  email: "ahmed@gmail.com",
  favoriteFoods:["kouskous","pasta"]
},

]
// call the function createManyPersons 
//createManyPersons(personArray);

//Find All persons in the list 

const getAllPersons = async () => {
try {
  const foundPersons = await Person.find();
  foundPersons.length > 0 ?  console.log("All persons", foundPersons)
  : console.log("No persons found")
}
 catch (error) {
  console.log("error in fetching persons", error)
  
}
}

// call the function getAllPersons
// getAllPersons(); 

//Find person by ID

const getPersonById = async (id) => {
try {
  const foundPerson = await Person.findById(id);
  foundPerson?  console.log("person by id", foundPerson)
  : console.log("No person found with this id")
}
 catch (error) {
  console.log("error in fetching person by id", error)
  
}
}

// call the function getPersonById
// getPersonById("66c5fd05e1e883632d4a413f");

// Find a Single Person with a Certain Food in Favorites

const getPersonByFavoriteFood = async (favoriteFood) => {
try {
  const foundPerson = await Person.find({ favoriteFoods: favoriteFood });
  foundPerson?  console.log("person by favorite food", foundPerson)
  : console.log("No person found with this favorite food")
}
 catch (error) {
  console.log("error in fetching person by favorite food", error)
  
}
}

// call the function getPersonByFavoriteFood
// getPersonByFavoriteFood('pasta')

//Find all the people having a given name

const getPersonsByName = async (name) => {
try {
  const foundPersons = await Person.find({ name: name });
  foundPersons.length > 0?  console.log("Persons by name", foundPersons)
  : console.log("No persons found with this name")
}
 catch (error) {
  console.log("error in fetching persons by name", error)
  
}
}
// getPersonsByName("ons");

//Perform Classic Updates by Running Find, Edit, then Save

const updatePersonById = async (id, newFood) => {
try {
  const foundPerson = await Person.findByIdAndUpdate(id,{$push:{favoriteFoods: newFood}}, { new: true });
  foundPerson?  console.log("person updated successfully", foundPerson)
  : console.log("No person found with this id")
}
 catch (error) {
  console.log("error in updating person by id", error)
  
}
}

// call the function updatePersonById
// updatePersonById("66c7442840e2cf3520ec13c4","Hamburger"); 

//Perform New Updates on a Document Using model.findOneAndUpdate()

const updatePersonByName = async (name, newAge) => {
try {
  const foundPerson = await Person.findOneAndUpdate({ name: name},{age: newAge}, { new: true });
  foundPerson?  console.log("person updated successfully", foundPerson)
  : console.log("No person found with this name")
}
 catch (error) {
  console.log("error in updating person by name", error)
  
}
}

// call the function updatePersonByName

// updatePersonByName("Jhon",20) 

// Delete One Document Using model.findByIdAndRemove

const deletePersonById = async (id) => {
try {
  const deletedPerson = await Person.findByIdAndDelete(id);
  deletedPerson?  console.log("person deleted successfully", deletedPerson)
  : console.log("No person found with this id")
}
 catch (error) {
  console.log("error in deleting person by id", error)
  
}
}

// call the function deletePersonById
// deletePersonById("66c744062127e83d19176612"); 
//
// MongoDB and Mongoose - Delete Many Documents with model.remove()

const deletePeopleByName = async (name) => {
  try {
    const result = await Person.deleteMany({ name: name });
    console.log("Deleted count:", result.deletedCount);
    return result;
  } catch (error) {
    console.error("Error deleting people by name:", error);
  }
};

// Example usage
//deletePeopleByName("Mary");

//Chain Search Query Helpers to Narrow Search Results
const findPeopleWhoLikePasta = async () => {
  try {
    const people = await Person.find({ favoriteFoods: "pasta" })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 }) // Hide age field
      .exec();
    console.log("Filtered and sorted people:", people);
    return people;
  } catch (error) {
    console.error("Error finding people who like Pasta:", error);
  }
};

// Example usage
findPeopleWhoLikePasta()




    