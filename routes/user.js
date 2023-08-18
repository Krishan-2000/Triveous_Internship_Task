const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).send({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashpassword,
    });
    await user.save();
    res.status(201).send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in registering User" });
  }
});

module.exports = router;
