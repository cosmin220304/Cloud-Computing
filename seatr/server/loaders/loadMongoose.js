const { connect } = require("mongoose");
const { MONGO_URI } = process.env;

const loadMongoose = async () => {
  connect(MONGO_URI, { useNewUrlParser: true });
};

module.exports = loadMongoose;
