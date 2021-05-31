const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const postReservationSchema = Joi.object({
  reservationDate: Joi.date().required(),
  seatCount: Joi.number().required(),
  userPhone: Joi.string().required(),
  userGender: Joi.string().required(),
  userName: Joi.string().required(),
  order: Joi.string().allow(null, '').optional(),
});

module.exports = validator.body(postReservationSchema);
