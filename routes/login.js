const express = require("express");
const router = express.Router();
const _ = require("lodash");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password. ");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password. ");

    const token = jwt.sign(
      {
        _id: user._id,
        email: req.body.email,
        user: user.name,
      },
      process.env.JWT_PRIVATE_KEY
    );
    res
      .status(200)
      .send({ token, user: _.pick(user, ["_id", "name", "email"]) });
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something failed");
  }
});

module.exports = router;
