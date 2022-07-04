const express = require("express");
// const errorHandler = require("../../helpers/errorHandler/errorHandler");
const moviesSchema = require("../models/movies_shema");
//GET METHOD
const getAllMoviesList = async (req, res) => {
  const movieList = await moviesSchema.find();
  if (!movieList) {
    return res.status(500).json({ success: false });
  }

  res.status(200).send(movieList);
  return;
};

//GET METHOD BY ID
const getMovieByName = async (req, res) => {
  const movie = await moviesSchema.findOne({ title: req.params.name });
  if (!movie) {
    return res.status(500).json({
      success: false,
      message: "The category with the given name not exists.",
    });
  }
  res.status(200).send(movie);
};

//POST METHOD
const postMovies = async (req, res) => {
  let movie = new moviesSchema(req.body);
  //   const { error } = errorHandler(req.body);
  //   if (error) {
  //     res.status(400).send(error.details[0].message);
  //     return;
  //   }
  movie = await movie.save();
  if (!movie) {
    return res.status(404).send("brand cannot be created");
  }
  res.status(201).send(movie);
};

//DELETE METHOD
// router.delete("/:id", (req, res) => {
//   Brands.findByIdAndRemove(req.params.id)
//     .then((brand) => {
//       if (brand) {
//         return res.status(200).send(brand);
//       } else {
//         return res
//           .status(404)
//           .json({ success: false, message: "category cannot find" });
//       }
//     })
//     .catch((err) => {
//       return res.status(400).json({ success: false, message: err });
//     });
// });

//PUT METHOD
// router.put("/:id", async (req, res) => {
//   const brand = await Brands.findByIdAndUpdate(req.params.id, {
//     brandCode: req.body.brandCode,
//     brandName: req.body.brandName,
//     email: req.body.email,
//     companyLogo: req.body.companyLogo,
//     websiteUrl: req.body.websiteUrl,
//     legalName: req.body.legalName,
//     legalConstituitionName: req.body.legalConstituitionName,
//     businessPan: req.body.businessPan,
//     dateOfIncorporation: `${req.body.dateOfIncorporation}T12:24:49.718Z`,
//     cin: req.body.cin,
//   });
//   if (!brand) {
//     return res.status(404).send("brand cannot be updated");
//   }
//   const { error } = errorHandler(req.body);
//   if (error) {
//     res.status(400).send(error.details[0].message);
//     return;
//   }
//   res.send(brand);
// });
// module.exports = router;

// const giveRating = async (res, res) => {

// };

module.exports = { getAllMoviesList, getMovieByName, postMovies };
