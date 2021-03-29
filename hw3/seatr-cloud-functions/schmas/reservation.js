const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
 
const postReservationSchema = Joi.object({
  name: Joi.string().required()
})
 