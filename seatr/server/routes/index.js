const reservationRouter = require("./reservation");
const restaurantRouter = require("./restaurant");
const cronRouter = require("./cron");
const reviewRouter = require("./reviews");
const userRouter = require("./user");
const { Router } = require("express");

const router = Router();

router.use(reservationRouter);
router.use(restaurantRouter);
router.use(cronRouter);
router.use(reviewRouter);
router.use(userRouter);
module.exports = router;
