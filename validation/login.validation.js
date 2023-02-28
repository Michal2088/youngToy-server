const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().required().min(10).max(1024).email().trim(),
  password: joi.string().required().min(8).max(1024),
});

const loginValidation = (userData) => {
  return loginSchema.validateAsync(userData);
};

module.exports = loginValidation;
