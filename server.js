// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Creating an Express application
const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());
app.use("/api", require("./routes/personRoutes"));

// Connecting to MongoDB Atlas database using URI from .env file
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to the database:", err));

// Setting up a constant for the server port
const PORT = 5000;

// Starting the Express server
app.listen(PORT, () => console.log("Server is running on port", PORT));
