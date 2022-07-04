const express = require("express");
const { verify } = require("jsonwebtoken");
const secretKey = require("../secretKey/secret_key");

const checkToken = async (req, res, next) => {
  let token = req.get("Authorization");
  if (token) {
    token = token.slice(7);
    verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.send(401).json({
          success: 0,
          message: "invalid Token",
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "UnAouthrized user",
    });
  }
};

module.exports = checkToken;
