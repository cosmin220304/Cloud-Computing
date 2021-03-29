const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const postReservationSchema = Joi.object({
    reservationDate:Joi.date().required(),
    seatCount:Joi.number().required(),
    restaurantId:Joi.string().required(),
})
 
module.exports = validator.query(postReservationSchema)