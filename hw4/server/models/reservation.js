const { model, Schema, SchemaTypes } = require("mongoose");

const reservationSchema = new Schema({
  reservationDate: SchemaTypes.Date,
  seatCount: SchemaTypes.Number,
  userEmail: SchemaTypes.String,
});

module.exports = model("reservation", reservationSchema, "reservations");
