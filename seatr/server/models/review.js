const { model, Schema, SchemaTypes } = require("mongoose");

const reviewSchema = new Schema({
  description: SchemaTypes.String,
  imageHref: SchemaTypes.String,
  restaurantName: SchemaTypes.String,
});

module.exports = model("review", reviewSchema, "review");
