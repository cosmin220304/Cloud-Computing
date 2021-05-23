const { createProxyMiddleware } = require("http-proxy-middleware");

const url = "https://seatr-the-best-api.azurewebsites.net";
const host = "seatr-the-best-api.azurewebsites.net";
module.exports = function (app) {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: url,
      secure: false,
      headers: {
        host: host 
      },
      cookieDomainRewrite: ""
    })
  );
};
