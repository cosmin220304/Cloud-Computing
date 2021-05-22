const { restaurantController } = require("../controllers");
const { Router } = require("express");
const { restaurantValidator } = require("../schemas");

const router = Router();

router.get("/restaurant", restaurantController.getAllRestaurants);
router.get(
  "/restaurant/:restaurantName",
  restaurantController.getRestaurantById
);
router.post(
  "/restaurant",
  restaurantValidator.post,
  restaurantController.createRestaurant
);
router.put(
  "/restaurant/:restaurantName",
  restaurantValidator.post,
  restaurantController.updateRestaurantByName
);
router.patch(
  "/restaurant/:restaurantName",
  restaurantValidator.patch,
  restaurantController.partialUpdateRestaurantByName
);
router.delete(
  "/restaurant/:restaurantName",
  restaurantController.removeRestaurantByName
);

module.exports = router;
