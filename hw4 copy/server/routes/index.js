const reservationRouter = require("./reservation");
const restaurantRouter = require("./restaurant");
const cronRouter = require("./cron");
const reviewRouter = require("./reviews");
const { Router } = require("express");

const router = Router();

router.use(reservationRouter);
router.use(restaurantRouter);
router.use(cronRouter);
router.use(reviewRouter);
module.exports = router;
