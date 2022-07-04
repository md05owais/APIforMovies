const Joi = require("joi");

const validateRatings = Joi.object({
  movieName: Joi.string().required(),
  rating: Joi.number().min(0).max(10).required(),
});

module.exports = validateRatings;
