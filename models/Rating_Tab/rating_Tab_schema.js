const mongoose = require("mongoose");
const createRating = mongoose.Schema({
  userId: {
    type: String,
  },
  movieName: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("ratingTab", createRating);
