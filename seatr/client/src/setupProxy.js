const { createProxyMiddleware } = require("http-proxy-middleware");

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://seatr-the-best-api.azurewebsites.net";
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
      secure: false,
    })
  );
};
