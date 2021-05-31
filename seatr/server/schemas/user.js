const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
 
const userSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  uid: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  gender: Joi.string().required(),
  email: Joi.string().required(),
})

module.exports = validator.body(userSchema)
