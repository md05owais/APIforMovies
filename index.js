// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://0.0.0.0:27017/playground")
//   .then(() => console.log("connected to MongoDB..."))
//   .catch((err) => console.log("not connect mongoDB...", err));

// const Owais = mongoose.model("Owais", schema);

// const owais1 = new Owais({ name: "owais" });

// owais1.save();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(morgan("tiny"));

const movieRoute = require("./routes/movies_routes/movie_routes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = process.env.API_URL;
const db = process.env.DB_HOST;
app.use(`${api}`, movieRoute);

mongoose
  .connect(db)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("An error occured", err));

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("listening on port " + port + "and" + api);
});
