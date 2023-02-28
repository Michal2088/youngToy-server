const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
  },
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      description: String,
      quantity:Number,
      category: String,
      image: String,
      isItOnSale:Boolean,
      salePrice:Number,
      color:String
    },
  ],
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = { Cart };