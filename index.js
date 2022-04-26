// imports
const express = require("express");
const db = require("./db/db");
const app = express();
// imports

// ROUTES
const karaoke = require("./routes/karaoke");
// ROUTES

// USE OF ROUTES
app.use(express.json());
app.use("/karaoke", karaoke);
// USE OF ROUTES

app.get("/", (req, res) => {
  res.send("<h1>hi</h1>");
});

app.listen(5000, () => {
  console.log("Server Running at 5000");
});
