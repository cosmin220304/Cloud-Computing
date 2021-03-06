const db = require("../models");
const { computeDistance } = require("../services/computeDistance");

module.exports.getAllRestaurants = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    delete req.query.lat;
    delete req.query.lng;

    const restaurants = await db.Restaurant.find({ ...req.query });
    console.log("getting restaurants");
    console.log(restaurants);
    const restaurantsPromises = restaurants.map(async (restaurant) => {
      const distance = await computeDistance(
        restaurant.lat,
        restaurant.lng,
        lat,
        lng
      );
      return { ...restaurant._doc, distance,  };
    });
    return Promise.all(restaurantsPromises).then((_restaurants) => {
      console.log(_restaurants);
      return res.status(200).json(_restaurants);
    });
  } catch (err) {
    console.log("Error geting all restaurants > ", err.message);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.createRestaurant = async (req, res) => {
  try {
    console.log(req.body);
    const restaurant = await db.Restaurant.create({ 
      ...req.body,
      starCount: 0,
      rating: 0,
      starSum: 0,
    })
    return res.status(200).json({ restaurant });
  } catch (err) {
    console.log("Error creating restaurant > ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getRestaurantById = async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;
    console.log(restaurantName);
    const restaurant = await db.Restaurant.findOne({
      name: restaurantName,
    });
  
    if (!restaurant) {
      return res.status(404).json({ message: "not found" });
    }

    restaurant.distance = await computeDistance(
      restaurant.lat,
      restaurant.lng,
      req.query.lat,
      req.query.lng
    );
    res.status(200).json({ restaurant });
  } catch (err) {
    console.log("Error geting restaurant by name > ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.updateRestaurantByName = async (req, res) => {
  try {
    const name = req.params.restaurantName;
    console.log({ ...req.body });
    const restaurant = await db.Restaurant.updateOne(
      { name },
      { $set: { ...req.body } }
    );

    if (restaurant) {
      return res.status(200).json({ restaurant });
    }
  } catch (err) {
    console.log("Error updating restaurant > ", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports.partialUpdateRestaurantByName = async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;
    console.log(restaurantName);
    const restaurant = await db.Restaurant.findOne({
      name: restaurantName,
    });
  
    if (!restaurant) {
      return res.status(404).json({ message: "not found" });
    }

    const bodyMenu = req.body?.menu || []
    const bodyTags = req.body?.tags || []
    req.body.menu = [...restaurant.menu, ...bodyMenu]
    req.body.tags = [...restaurant.tags, ...bodyTags]

    const updatedRestaurant = await db.Restaurant.updateOne(
      { name: restaurantName },
      { $set: { ...req.body } }
    );
    if (updatedRestaurant) {
      return res.status(200).json({ updatedRestaurant });
    }
  } catch (err) {
    console.log("Error updating restaurant > ", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports.removeRestaurantByName = async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;

    const deleteRestaurant = db.Restaurant.deleteOne({ restaurantName });
    if (deleteRestaurant) {
      return res.status(200).json({ deleteRestaurant });
    }
  } catch (err) {
    console.log("Error deleting restaurant > ", err.message);
    res.status(500).json({ message: err.message });
  }
};
