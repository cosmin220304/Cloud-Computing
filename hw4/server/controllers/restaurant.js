const { Datastore } = require("@google-cloud/datastore");
const { v4: uuidv4 } = require("uuid");
const { Storage } = require("@google-cloud/storage");
const { computeDistance } = require("../services/computeDistance");

const storage = new Storage();
const datastore = new Datastore();

module.exports.getAllRestaurants = async (req, res) => {
  try {
    let [restaurants] = await datastore.createQuery("Restaurant").run();
    for (let r of restaurants) {
      r.distance = await computeDistance(
        r.lat,
        r.lng,
        req.query.lat,
        req.query.lng
      );
    }
    return res.status(200).json(restaurants);
  } catch (err) {
    console.log("Error geting all restaurants > ", err.message);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.createRestaurant = async (req, res) => {
  try {
    const restaurantKey = datastore.key("Restaurant");
    const restaurantQuery = {
      key: restaurantKey,
      data: {
        ...req.body,
      },
    };
    const restaurant = await datastore.save(restaurantQuery);
    return res.status(200).json({ restaurant });
  } catch (err) {
    console.log("Error creating restaurant > ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getRestaurantById = async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;
    const [[restaurant]] = await datastore
      .createQuery("Restaurant")
      .filter("name", "=", restaurantName)
      .run();
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
    const restaurantName = req.params.restaurantName;

    const updateRestaurant = await datastore
      .createQuery("Restaurant")
      .filter("name", "=", restaurantName)
      .run()
      .then((results) => {
        const restaurants = results[0];
        const restaurantKey = restaurants[0][datastore.KEY];
        return restaurantKey;
      })
      .then((restaurantKey) => {
        console.log(restaurantKey);
        return datastore.upsert({
          key: restaurantKey,
          data: {
            ...req.body,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
        return null;
      });
    if (updateRestaurant) {
      return res.status(200).json({ updateRestaurant });
    }
  } catch (err) {
    console.log("Error updating restaurant > ", err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports.removeRestaurantByName = async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;

    const deleteRestaurant = await datastore
      .createQuery("Restaurant")
      .filter("name", "=", restaurantName)
      .run()
      .then((results) => {
        const restaurants = results[0];
        const restaurantKey = restaurants[0][datastore.KEY];
        return restaurantKey;
      })
      .then((restaurantKey) => {
        console.log(restaurantKey);
        return datastore.delete(restaurantKey);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
        return null;
      });
    if (deleteRestaurant) {
      return res.status(200).json({ deleteRestaurant });
    }
  } catch (err) {
    console.log("Error deleting restaurant > ", err.message);
    res.status(500).json({ message: err.message });
  }
};
