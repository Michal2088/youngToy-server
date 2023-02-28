const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
    maxlength: 1024,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin:{
    type:Boolean,
    required: true,
  }
});

const User = mongoose.model("users", userSchema);
module.exports = { User };
