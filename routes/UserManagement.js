const express = require("express");
const { Cart } = require("../models/Cart");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/User");


router.put('/:_id', auth,  async (req, res) => {
    try {
      if(!req.payload.isAdmin) return res.status(400).send("Only an admin can edit another user's details")
    let user = await User.findOne({ _id: req.params._id})
    if (!user) return res.status(404).send("user was not found");
    user.isAdmin=!user.isAdmin
    user.save()
    res.status(200).send(user.isAdmin);
  } catch (err) {
    res.status(400).send("error in update specific user "+err.message);
  }
   });


   router.get("/userNum", auth, async (req, res) => {
    try {
      if(!req.payload.isAdmin) return res.status(400).send("Only an admin can see how many users there are ")
      let userNum = await User.find().count();
      res.status(200).json(userNum);
    } catch (error) {
      res.status(400).send("error in get the number of users"+error.message);
    }
  });

//delete user with his cart
router.delete("/:_id", auth, async (req, res) => {
  try {
    if(!req.payload.isAdmin) return res.status(400).send("Only an admin can delete another user's details")
    let user = await User.findOneAndRemove({_id: req.params._id});
    if (!user) return res.status(400).send("user was not found");
    let cart=await Cart.findOneAndRemove({userId:req.params._id})
    if (!cart) return res.status(400).send("cart was not found");
    res.status(200).send("user was deleted");
  } catch (err) {
    res.status(400).send("error in delete specific user "+err.message);
  }
});

//get all users
router.get("/", auth, async (req, res) => {
    try {
      if(!req.payload.isAdmin) return res.status(400).send("Only an admin can see all the users")
      let allUser = await User.find();
      res.status(200).send(allUser);
    } catch (error) {
      res.status(400).send("error in get all users");
    }
  });

module.exports = router;