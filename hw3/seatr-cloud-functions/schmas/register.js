const { string } = require('joi')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
 
const registerSchema = Joi.object({ 
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  code: Joi.length(4).string().required(),
})
 
module.exports = validator.query(registerSchema)