const express = require("express");
const userSchema = require("../../models/user/user.schema");
const userValidation = require("../../models/user/user_validaton");
const { hashSync, genSaltSync } = require("bcrypt");

const createUserAccount = async (req, res) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  try {
    const salt = genSaltSync(10);
    const hashPass = hashSync(req.body.password, salt);
    req.body.password = hashPass;
    let user = new userSchema(req.body);
    user = await user.save();
    if (!user) {
      return res.status(404).send("somethings went wrong...");
    }
    res.status(201).send(user);
    return;
  } catch (err) {
    res.status(400).json({
      status: 0,
      message: err.message,
    });
    return;
  }
};

const getAllUser = async (req, res) => {
  // res.send("owais");
  const user = await userSchema.find();
  if (!user) {
    return res.status(500).json({ success: false });
  }
  res.status(200).send(user);
  return;
};

module.exports = { createUserAccount, getAllUser };
