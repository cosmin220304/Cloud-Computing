const { model, Schema, SchemaTypes } = require("mongoose");

const reservationSchema = new Schema({
  reservationDate: SchemaTypes.Date,
  seatCount: SchemaTypes.Number,
  userPhone: SchemaTypes.String,
  status: SchemaTypes.String,
  userGender: SchemaTypes.String, 
  userName: SchemaTypes.String, 
  restaurantName: SchemaTypes.String, 
  order: SchemaTypes.String, 
  fcmToken: SchemaTypes.String,
});

module.exports = model("reservation", reservationSchema, "reservation");
