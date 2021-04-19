const reservationRouter = require("./reservation");
const restaurantRouter = require("./restaurant");
const cronRouter = require("./cron");
const { Router } = require("express");

const router = Router();

router.use(reservationRouter);
router.use(restaurantRouter);
router.use(cronRouter);
module.exports = router;
