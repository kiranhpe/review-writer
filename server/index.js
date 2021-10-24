const express = require("express");
const path = require("path");
const reviewRoutes = require("./src/controllers/review.controller");
const adminRoutes = require("./src/controllers/admin.controller");
const connectToDB = require("./src/db/connetion");

const app = express();

app.use(express.json());

require("dotenv").config();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server! Baby" + IP });
});


app.use("/review", reviewRoutes);
app.use("/admin", adminRoutes)

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


connectToDB().then(() => {
  console.log("connected to DB");
});

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
