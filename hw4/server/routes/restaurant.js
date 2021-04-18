const { restaurantController } = require("../controllers");
const { Router } = require("express");
const { restaurantValidator } = require("../schmas");

const router = Router();

router.get("/restaurant", restaurantController.getAllRestaurants);
router.get(
  "/restaurant/:restaurantName",
  restaurantController.getRestaurantById
);
router.post(
  "/restaurant",
  restaurantValidator,
  restaurantController.createRestaurant
);
router.put(
  "/restaurant/:restaurantName",
  restaurantValidator,
  restaurantController.updateRestaurantByName
);
router.delete(
  "/restaurant/:restaurantName",
  restaurantController.removeRestaurantByName
);

module.exports = router;
