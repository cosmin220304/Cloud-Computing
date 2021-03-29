const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

module.exports.computeDistance = async (
  destinationLat,
  destinationLng,
  originsLat,
  originsLng
) => {
  try {
    var { data } = await client.distancematrix({
      params: {
        destinations: [{ lat: destinationLat, lng: destinationLng }],
        origins: [{ lat: originsLat, lng: originsLng }],
        key: "AIzaSyBurVLGz3_sK_P0Wt2RjXf_d3pU6hMh58g",
      },
      timeout: 5000,
    });
    console.log(data.rows[0].elements[0].duration.text);
    return data.rows[0].elements[0].duration.text;
  } catch (err) {
    console.log(err)
    return ""
  }
};
