const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().required().min(2).max(1024).trim(),
  email: joi.string().email().min(7).max(1024).trim().required(),
  password: joi
    .string()
    .required()
    .min(8)
    .max(30)
    .regex(
      /[^a-zA-Z\d]/).message( "Must include at least one of the following characters: _-!@#$%^&*")
    .regex(/\d{4,}/).message( "Must be at least 4 digits")
    .regex(/[a-z]/).message("Add a lowercase letter")
    .regex(/[A-Z]/).message("Add a capital letter"),
  isAdmin: joi.boolean().default(false)
});

const registerValidation = (userData) => {
  return registerSchema.validateAsync(userData);
};

module.exports = registerValidation;
