const express = require("express");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign, decode } = require("jsonwebtoken");
const userSchema = require("../user/user.schema");
const secretKey = require("../../helper/secretKey/secret_key");

generateToken = async (req, res) => {
  try {
    const result = await userSchema.findOne({ email: req.body.email });
    const comparePassword = compareSync(req.body.password, result.password);
    if (comparePassword) {
      result.password = undefined;
      const jsonToken = sign({ data: result }, secretKey, {
        expiresIn: "1h",
      });
      res.status(201).json({
        success: 1,
        message: "login successfully",
        Token: jsonToken,
      });
    } else {
      res.status(401).json({
        success: 0,
        message: "Invalid Email or Password",
      });
    }
  } catch (err) {
    res.status(401).json({
      success: 0,
      message: err.message,
    });
  }
};

module.exports = generateToken;
