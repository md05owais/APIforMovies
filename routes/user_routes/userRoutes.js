const express = require("express");
const router = express();
const {
  createUserAccount,
  getAllUser,
} = require("../../controller/user_controller/user.sighnup");

router.get("/", getAllUser);
router.post("/", createUserAccount);

module.exports = router;
