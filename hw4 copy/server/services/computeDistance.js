const { Client } = require("@googlemaps/google-maps-services-js");
const axios = require("axios");
require("dotenv").config();
const client = new Client({});
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const endpoint = `https://atlas.microsoft.com/route/matrix/sync/json?api-version=1.0&subscription-key=${subscriptionKey}`;
console.log(endpoint);
module.exports.computeDistance = async (
  destinationLat,
  destinationLng,
  originsLat,
  originsLng
) => {
  try {
    return axios
      .post(endpoint, {
        origins: {
          type: "MultiPoint",
          coordinates: [[originsLat, originsLng]],
        },
        destinations: {
          type: "MultiPoint",
          coordinates: [[destinationLat, destinationLng]],
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        console.log(
          "distance: ",
          res.matrix[0][0].response.routeSummary.travelTimeInSeconds
        );
        return (
          res.matrix[0][0].response.routeSummary.travelTimeInSeconds / 60 + 1
        );
      })
      .catch((err) => {
        console.log("error: ", err);
        return null;
      });
  } catch (err) {
    return { message: err.message };
  }
};
