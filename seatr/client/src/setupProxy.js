const { createProxyMiddleware } = require("http-proxy-middleware");

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://seatr-the-best-api.azurewebsites.net";
const host = process.env.NODE_ENV === "development" ? "localhost:8080" : "seatr-the-best-api.azurewebsites.net";
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
