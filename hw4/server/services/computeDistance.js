const { Client } = require("@googlemaps/google-maps-services-js");
require("dotenv").config();
const client = new Client({});

module.exports.computeDistance = async (
  destinationLat,
  destinationLng,
  originsLat,
  originsLng
) => {
  try {
    console.log(process.env.MAX_DISTANCE_API_KEY);
    var { data } = await client.distancematrix({
      params: {
        destinations: [{ lat: destinationLat, lng: destinationLng }],
        origins: [{ lat: originsLat, lng: originsLng }],
        key: process.env.MAX_DISTANCE_API_KEY,
      },
      timeout: 5000,
    });
    return data.rows[0].elements[0].duration.text;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
