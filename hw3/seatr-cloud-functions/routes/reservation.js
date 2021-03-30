const { Router } = require("express");
const { reservationController } = require("../controllers");
const { reservationValidator } = require("../schmas");

const router = Router();

router.get("/reservation", reservationController.getReservations);
router.post(
  "/restaurant/:restaurantName/reservation",
  reservationValidator,
  reservationController.createReservation
);
router.delete(
  "/restaurant/:restaurantName/reservation/:reservationId",
  reservationController.removeReservationById
);

module.exports = router;
