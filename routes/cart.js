const express = require("express");
const { Cart } = require("../models/Cart");
const auth = require("../middleware/auth");
const productValidation = require("../validation/products.validation");
const { Product } = require("../models/Product");
const router = express.Router();

//add product to cart
router.post("/", auth, async (req, res) => {
  try {
    const validatedValue = await productValidation(req.body);
    let cart = await Cart.findOne({ userId: req.payload._id });
    if (!cart) return res.status(400).send("cart was not found");

    cart.products.push(validatedValue);

    let product = await Product.findOne({ name: validatedValue.name });
    if (!product) return res.status(404).send("product was not found");
    product.quantity -= 1;
    await product.save();
    await cart.save();

    res.status(200).send("add product to cart");
  } catch (error) {
    res.status(400).send("error in add product to cart " + error.message);
  }
});
//get all the products from the cart
router.get("/", auth, async (req, res) => {
  try {
    
    let cart = await Cart.findOne({ userId: req.payload._id });
    if (!cart) return res.status(400).send(error.message);
    res.status(200).send(cart.products);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete product from cart
router.delete("/:index", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.payload._id });
    if (!cart) return res.status(400).send("cart was not found");
    let index = req.params.index;
    
    let product = await Product.findOne({name:cart.products[index].name });
    if (!product) return res.status(404).send("product was not found");
    product.quantity += 1;
    await product.save();
    
    if (!cart.products[index]) return res.status(400).send("product was not found");
    cart.products.splice(index, 1);

    await cart.save();

    res.status(201).send("product was deleted");
  } catch (error) {
    res.status(400).send("error in delete product " + error.message);
  }
});

module.exports = router;
