const express = require("express");
const ratingSchema = require("../../models/Rating_Tab/rating_Tab_schema");
const moviesSchema = require("../../models/movies_shema");
const { verify } = require("jsonwebtoken");
const secretKey = require("../../helper/secretKey/secret_key");
const validateRatings = require("./rating_validate");

const getMovieByName = async (moviename) => {
  let movie = await moviesSchema.findOne({ title: moviename.movieName });
  if (!movie) {
    return false;
  }
  return movie;
};
const findUserAlreadyRated = async (userId, movieName) => {
  const user = await ratingSchema.findOne({
    userId: userId,
    movieName: movieName,
  });
  if (!user) {
    return false;
  }
  return true;
};

const createRatings = async (req, res, next) => {
  try {
    const { error } = validateRatings.validate(req.body);

    if (error) {
      res.status(401).json({
        success: 0,
        message: error.details[0].message,
      });
      return;
    }
    let token = req.get("Authorization");
    token = token.slice(7);
    if (token) {
      verify(token, secretKey, async (err, decodedToken) => {
        if (err) {
          res.status(401).json({
            success: 0,
            message: "Invalid Token",
          });
          return;
        } else {
          // res.send(decodedToken.data.email)
          //   res.send(req.body);
          //   return;
          let movie = await getMovieByName(req.body);
          if (!movie) {
            res.status(404).json({
              success: 0,
              message: "movie Not found",
            });
            return;
          }
          const data = {
            userId: decodedToken.data.email,
            movieName: req.body.movieName,
            rating: req.body.rating,
          };

          // check when a user alrady rated
          const checkUserInRatingTables = await findUserAlreadyRated(
            data.userId
          );

          let newvote_average, totalVoter;
          if (checkUserInRatingTables) {
            let totalVote = movie.vote_average * movie.vote_count;
            let updatedTotalVote = totalVote - checkUserInRatingTables.rating;
            totalVoter = movie.vote_count - 1;
            newvote_average = updatedTotalVote / totalVoter;
          }

          // Updated rating and total number of users of movies
          if ((movie.vote_average = "NA")) {
            (newvote_average = 0), (newvote_count = 0);
          }
          let totalVote = movie.vote_average * movie.vote_count;
          let updatedTotalVote = totalVote + data.rating;
          totalVoter = movie.vote_count + 1;
          newvote_average = updatedTotalVote / totalVoter;
          // vote_count = totalVoter;
          let newRating = new moviesSchema(movie);
          newRating = await newRating.updateOne({
            vote_average: newvote_average,
            vote_count: totalVoter,
          });
          // rating by user inserted into rating table

          let result = new ratingSchema(data);
          result = await result.save();
          if (!result) {
            return res.status(404).send("something went wrong");
          } else {
            res.status(201).json({
              success: 1,
              message: "Thank you for your valuable time",
            });
            return;
          }
        }
      });
    } else {
      res.status(401).json({
        success: 0,
        message: "Invalid token",
      });
      return;
    }
  } catch (err) {
    res.status(404).json({
      success: 0,
      message: err.message,
    });
    return;
  }
};

module.exports = createRatings;
