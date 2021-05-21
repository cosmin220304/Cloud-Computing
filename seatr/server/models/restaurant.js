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
      description: SchemaTypes.String,
      photoHref: SchemaTypes.String,
      price: SchemaTypes.Number,
    },
  ],
  lat: SchemaTypes.Number,
  lng: SchemaTypes.Number,
});

module.exports = model("restaurant", restaurantSchema, "restaurant");
