const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Product } = require("../models/Product");
const productValidation = require("../validation/products.validation");

router.post("/", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only admin can add product");
    const validatedValue = await productValidation(req.body);
    let product = await Product.findOne({ name: validatedValue.name });
    if (product)
      return res
        .status(400)
        .send(
          "product already exit,If you want to add an identical product, you can edit the existing product and add in the quantity field"
        );
    product = new Product(validatedValue);
    await product.save();
    res.status(201).send("product add");
  } catch (err) {
    res.status(400).send("error in add product " + err.message);
  }
});

router.get("/sale", async (req, res) => {
  try {
    let productsOnSale = await Product.find({
      isItOnSale: true,
    }).limit(8);
    if (!productsOnSale)
      return res.status(400).send("There are currently no products on sale");
    res.status(200).send(productsOnSale);
  } catch (error) {
    res.status(400).send("error in get products");
  }
});

//get 1 product
router.get("/specificProduct/:_id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params._id });

    if (!product) return res.status(404).send("product was not found");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send("error in get specific product " + error.message);
  }
});

//dolls,motorized,cars,multi-age,babies,box-games
router.get("/category/:category", async (req, res) => {
  try {
    const category = await Product.find({ category: req.params.category });
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//
router.put("/:_id", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only an admin can edit product");
    const validatedValue = await productValidation(req.body);
    let product = await Product.findOneAndUpdate(
      { _id: req.params._id },
      validatedValue,
      { new: true }
    );
    if (!product) return res.status(404).send("product was not found");
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send("error in update specific card " + err.message);
  }
});

router.delete("/:_id", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only an admin can delete product");
    let product = await Product.findOneAndRemove({ _id: req.params._id });
    if (!product) return res.status(404).send("product was not found");
    res.status(200).send("product was deleted");
  } catch (err) {
    res.status(400).send("error in delete specific product " + err.message);
  }
});

module.exports = router;
