const express = require("express");
const router = express();
const userRoutes = require("../user_routes/userRoutes");
const jsonToken = require("../../models/user/user.login");
const checkToken = require("../../helper/validate_token/validateToken");
const createRatings = require("../../controller/movie_ratings_controller/create_rating_controller");
const movieRating = require("../../controller/movie_ratings_controller/rating_controller");
const {
  getAllMoviesList,
  getMovieByName,
  postMovies,
} = require("../../controller/movies_controller");

// routes for user registration

router.use("/registration", userRoutes);

// routes for movies and ratings
router.post("/login", jsonToken);
router.get("/", checkToken, getAllMoviesList);
router.get("/:name", checkToken, getMovieByName);
router.post("/", postMovies);

// Rating API
router.get("/movies/ratings", movieRating);
router.post("/movies/ratings/createRatings", checkToken, createRatings);
module.exports = router;
