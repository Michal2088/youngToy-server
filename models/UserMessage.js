const { boolean } = require("joi");
const mongoose = require("mongoose");
const userMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  email: {
    type: String,
    required: true,
    minlength:7,
  },
  phon: {
    type: String,
  },
  message: {
    type: String,
    maxlength: 4000,
  },
  date: {
    type: String,
    maxlength: 4000,
  },
  alreadyBeenRead: {
    type: Boolean,
  },
});

const UserMessage = mongoose.model("userMessage", userMessageSchema);
module.exports = { UserMessage };