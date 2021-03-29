const { string } = require('joi')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
 
const postRestaurantSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  logoHref:Joi.string().uri().required(),
  backgroundHref:Joi.string().uri().required(),
  menu:Joi.array().items(Joi.object({
    name:Joi.string(),
    description:Joi.string(),
    photoHref:Joi.string(),
    price:Joi.number().positive()
  }))
})
 
module.exports = validator.body(postRestaurantSchema)