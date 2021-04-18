const reservationController = require("./reservation");
const restaurantController = require("./restaurant");
const userController = require("./user");
const authController = require("./auth");
const cronController = require("./cron");

module.exports = {
  reservationController,
  restaurantController,
  userController,
  authController,
  cronController,
};
