const mongoose = require("mongoose");
const movieDetails = mongoose.Schema({
  adult: {
    type: Boolean,
  },
  backdrop_path: {
    type: String,
  },
  belong_to_collection: {
    type: String,
  },
  budget: {
    type: Number,
  },
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  homepage: {
    type: String,
  },
  id: {
    type: Number,
  },
  imdb_id: {
    type: String,
  },
  original_language: {
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: { type: String },
  popularity: Number,
  poster_path: {
    type: String,
  },
  production_companies: [
    {
      id: Number,
      logo_path: String,
      name: String,
      original_country: String,
    },
  ],
  production_countries: [
    {
      iso_3166_1: String,
      name: String,
    },
  ],
  release_date: {
    String,
  },
  revenue: {
    type: Number,
  },
  runtime: {
    type: Number,
  },
  spoken_languages: [
    {
      english_name: String,
      iso_639_1: String,
      name: String,
    },
  ],

  status: {
    type: String,
  },
  tagline: {
    type: String,
  },
  title: {
    type: String,
  },
  video: {
    type: Boolean,
  },
  vote_average: Number,
  vote_count: {
    type: Number,
  },
});

module.exports = mongoose.model("movieDetails", movieDetails);
