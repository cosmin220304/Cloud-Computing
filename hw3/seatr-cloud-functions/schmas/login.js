const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
 
const loginSchema = Joi.object({  
  phoneNumber: Joi.string().pattern(/^[0-9]+$/).required(),
  code: Joi.string().required(),
})
 
module.exports = validator.query(loginSchema)