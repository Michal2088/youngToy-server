
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  quantity:{
    type:Number,
    required: true,
  },
  category:{
    type:String,
    required: true,
    minlength: 2,
  },
  image:{
    type:String,
    required: true,
  },
  isItOnSale:{
    type:Boolean,
    required: true,
  },
  salePrice:{
    type:Number,
  }
});

const Product = mongoose.model("products", productSchema);
module.exports = { Product };