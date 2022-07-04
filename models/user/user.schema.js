const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userDetails = mongoose.Schema({
  userName: {
    type: String,
    allowNull: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    allowNull: false,
  },
  password: {
    type: String,
    allowNull: false,
  },
  sex: {
    type: String,
  },
});

userDetails.plugin(uniqueValidator);
module.exports = mongoose.model("userDetails", userDetails);
