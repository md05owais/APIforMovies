const express = require("express");
const moviesSchema = require("../../models/movies_shema");

const ratingOfEachMovies = async (req, res) => {
  try {
    const movies = await moviesSchema.find();
    const result = [];
    movies.map((data) => {
      let movieName = data.title;
      let ratings = data.vote_average;
      result.push({
        movie: movieName,
        averageRating: ratings > 0 ? ratings : "NA",
      });
    });
    res.status(201).json(result);
  } catch (err) {
    res.send(400).json({
      success: 0,
      message: "NA",
    });
  }
};

module.exports = ratingOfEachMovies;
