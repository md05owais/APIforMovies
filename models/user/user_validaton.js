const Joi = require("joi");
const userValidation = Joi.object({
  userName: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(11).required(),
  password: Joi.string().min(5).max(12).required(),
  sex: Joi.string(),
});

module.exports = userValidation;
