const express = require("express");
const router = express.Router();
const userExist = require("../middlewares/userExist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authuser = require("../middlewares/authuser");
const User = require("../database/Models/userModel");

const privateKey = "hunfaisagoodboy";

router.get("/", authuser, async (req, res) => {
  const token = req.headers.token;
  if (req.user) {
    const email = req.user.email;

    const user = await User.findOne({ email });
    if (user) {
      res.send({ success: true, payload: { token, user: user } });
    } else res.send({ success: false, payload: "user not found" });
  } else {
    res.send({ success: false, payload: "Authentication Error" });
  }
});

module.exports = router;
