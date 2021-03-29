const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
 
const postRestaurantSchema = Joi.object({
  name: Joi.string().required()
})
 