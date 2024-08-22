// require mongoose
const mongoose = require("mongoose");

// function connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database successfully !");
  } catch (error) {
    console.log(error);
  }
};

// export connect function
module.exports = connectDB;

