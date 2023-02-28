const joi = require("joi");
let date = new Date().toLocaleDateString();
console.log(date);

const userMessageSchema = joi.object({
  name: joi.string().required().min(2).max(1024).trim(),
  email: joi.string().email().min(7).max(1024).trim().required(),
  phone:joi.string().regex(/^([0]\d{1,3}[-])?\d{7,10}$/).message("The number entered is invalid"),
  message:joi.string().max(4000),
  date:joi.string().default(date),
  alreadyBeenRead:joi.boolean().default(false),
});

const userMessageValidation = (userMessage) => {
  return userMessageSchema.validateAsync(userMessage);
};

module.exports = userMessageValidation;