const { model, Schema, SchemaTypes } = require("mongoose");

const userSchema = new Schema({
  phoneNumber: SchemaTypes.String,
  uid: SchemaTypes.String,
  name: SchemaTypes.String,
  surname: SchemaTypes.String,
  gender: SchemaTypes.String,
  email: SchemaTypes.String,
});

module.exports = model("user", userSchema, "user");
