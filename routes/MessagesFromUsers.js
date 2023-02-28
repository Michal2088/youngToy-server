const express = require("express");
const router = express.Router();
const userMessageValidation = require("../validation/userMessage.validation");
const { UserMessage } = require("../models/UserMessage");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
    try {
      const validatedValue = await userMessageValidation(req.body);
      let message=await new UserMessage(validatedValue);
    await message.save()
     res.status(201).send(message);
    } catch (error) {
      res.status(400).send(error.message);
    }

  });

  //get all users Messages
router.get("/", auth, async (req, res) => {
  try {
    if(!req.payload.isAdmin) return res.status(400).send("Only an admin can see the users Messages")
    let Messages = await UserMessage.find().sort( { _id : -1 } );
    res.status(200).send(Messages);
  } catch (error) {
    res.status(400).send("error in get all Messages");
  }
});

router.put('/:_id', auth,  async (req, res) => {
  try {
    if(!req.payload.isAdmin) return res.status(400).send("Only an admin can edit another user's details")
  let userMessage = await UserMessage.findOne({ _id: req.params._id})
  if (!userMessage) return res.status(404).send("user message was not found");
  userMessage.alreadyBeenRead=!userMessage.alreadyBeenRead
  userMessage.save()
  res.status(200).send( userMessage.alreadyBeenRead);
} catch (err) {
  res.status(400).send("error in update specific user message"+err.message);
}
 });



module.exports = router;
