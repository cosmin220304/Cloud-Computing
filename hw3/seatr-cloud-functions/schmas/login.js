const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const loginSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  code: Joi.number().required(),
});

module.exports = validator.body(loginSchema);
