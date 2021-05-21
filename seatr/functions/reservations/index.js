const { default: axios } = require("axios");

module.exports = async function (context, req) {
  var response = await axios.get(
    `https://seatr-backend.azurewebsites.net/api/reservation`
  );
  context.res = {
    body: {
      data: [...response.data],
    },
  };
};
