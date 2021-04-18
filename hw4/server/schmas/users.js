const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
 
const postUserSchema = Joi.object({
  name: Joi.string().required()
})
 