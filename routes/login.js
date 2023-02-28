const express = require("express");
const joi = require("joi");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginValidation = require("../validation/login.validation");
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const validatedValue = await loginValidation(req.body);
    let user=await User.findOne({email:validatedValue.email})
    if(!user) return res.status(400).send("invalid email or password")
    const result=await bcrypt.compare(req.body.password,user.password)
    if(!result) return res.status(400).send("invalid email or password")
    const genToken=jwt.sign({_id: user._id, isAdmin: user.isAdmin},process.env.secretKey)
    res.status(200).send({token:genToken})
  } catch (error) {
    res.status(400).send("error in login "+error.message);
  }
});

module.exports = router;
