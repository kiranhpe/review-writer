const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Review = require("./src/models/review.schema");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

require("dotenv").config();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server! Baby" + IP });
});

var reviewRoutes = require("./src/controllers/review.controller");
app.use("/review", reviewRoutes);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const connectToDB = async () => {
  await mongoose.connect(process.env.DB);
};

connectToDB().then(() => {
  console.log("connected to DB");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
