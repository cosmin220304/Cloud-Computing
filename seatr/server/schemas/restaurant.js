const { string } = require("joi");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const postRestaurantSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  logoHref: Joi.string().uri().required(),
  backgroundHref: Joi.string().uri().required(),
  menu: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      quantity: Joi.number(),
      description: Joi.string(),
      photoHref: Joi.string(),
      price: Joi.number().positive(),
    })
  ),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  tags: Joi.array().items(Joi.string().allow(null).allow("")).optional(),
  maxSeatCount: Joi.number().required(),
  currentAvailableSeats: Joi.number().required(),
  priceRange: Joi.number().min(1).max(3).required(),
});

const patchRestaurantSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  logoHref: Joi.string().uri().optional(),
  backgroundHref: Joi.string().uri().optional(),
  menu: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      quantity: Joi.number(),
      description: Joi.string(),
      photoHref: Joi.string(),
      price: Joi.number().positive(),
    })
  ),
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
  tags: Joi.array().items(Joi.string().allow(null).allow("")).optional(),
  maxSeatCount: Joi.number().optional(),
  currentAvailableSeats: Joi.number().optional(),
  priceRange: Joi.number().min(1).max(3).optional(),
});

module.exports = {
  post: validator.body(postRestaurantSchema),
  patch: validator.body(patchRestaurantSchema)
}
