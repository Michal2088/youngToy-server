const joi = require("joi");

const productSchema = joi.object({
  name: joi.string().required().min(2).max(1024).trim(),
  price: joi.number().required(),
  description: joi.string().required().min(2).max(1024).trim(),
  quantity: joi.number().required(),
  category: joi.string().required().min(2).trim(),
  image: joi.string().required().trim(),
  isItOnSale: joi.boolean().required(),
  salePrice: joi.number(),
});

const productValidation = (userData) => {
  return productSchema.validateAsync(userData);
};

module.exports =  productValidation;
