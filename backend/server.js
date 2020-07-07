// creating the backend and connecting to MongoDB atlas
// Dependancies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// CORS middleware - for parsing out JSON
app.use(cors());
app.use(express.json());

// CONNECTING TO MONGODB ATLAS SERVER
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter); // if browse to /exercises => routed to exerciseRouter
app.use("/users", usersRouter); // if browse to /users => routed to usersRouter

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
