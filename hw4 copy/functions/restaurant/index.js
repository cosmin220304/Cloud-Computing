const { default: axios } = require("axios");

module.exports = async function (context, req) {
  let qs = "";
  if (req.query.lat && req.query.lng)
    qs = `lat=${req.query.lat}&lng=${req.query.lng}`;
  var response = await axios.get(
    `https://seatr-backend.azurewebsites.net/api/restaurant?${qs}`
  );
  context.res = {
    body: {
      data: [...response.data],
    },
  };
};
