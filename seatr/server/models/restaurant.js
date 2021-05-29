const { model, Schema, SchemaTypes } = require("mongoose");

const restaurantSchema = new Schema({
  name: SchemaTypes.String,
  ownerId: SchemaTypes.String,
  description: SchemaTypes.String,
  logoHref: SchemaTypes.String,
  backgroundHref: SchemaTypes.String,
  menu: [
    {
      name: SchemaTypes.String,
      quantity: SchemaTypes.Number,
      description: SchemaTypes.String,
      photoHref: SchemaTypes.String,
      price: SchemaTypes.Number,
    },
  ],
  lat: SchemaTypes.Number,
  lng: SchemaTypes.Number,
  tags: [SchemaTypes.String],
  maxSeatCount: SchemaTypes.Number,
  currentAvailableSeats: SchemaTypes.Number,
  rating: SchemaTypes.Number,
  starCount: SchemaTypes.Number,
  starSum: SchemaTypes.Number,
  priceRange: SchemaTypes.Number,
});

module.exports = model("restaurant", restaurantSchema, "restaurant");
