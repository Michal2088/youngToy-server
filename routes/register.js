const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const registerValidation = require("../validation/register.validation");
const { Cart } = require("../models/Cart");
const router = express.Router();


router.post("/", async (req, res) => {
    try{
    const validatedValue = await registerValidation(req.body);
    let user = await User.findOne({ email: validatedValue.email });
    if (user) return res.status(400).send("user already exit");
    user = new User(validatedValue);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    let cart = new Cart({ userId: user._id, products: [] });
    await cart.save();
    const genToken = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.secretKey
    );
    await user.save();
    res.status(201).send({ token: genToken });
  } catch (error) {
    res.status(400).send(error.message);
  }
})

module.exports = router;
