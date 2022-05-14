// imports
const express = require("express");
const db = require("./db/db");
const app = express();
// imports

// ROUTES
const karaoke = require("./routes/karaoke");
const create = require("./routes/create")
const search = require("./routes/search")
const trending = require("./routes/trending")
// ROUTES

// USE OF ROUTES
app.use(express.json());
app.use("/karaoke", karaoke);
app.use("/create",create);
app.use("/search",search);
app.use("/trending",trending);
// USE OF ROUTES

app.get("/", (req, res) => {
  res.send("<h1>hi</h1>");
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server Running at "+port)
})