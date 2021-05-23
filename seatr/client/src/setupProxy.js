const { createProxyMiddleware } = require("http-proxy-middleware");

const url = process.env.API_URL || "http://localhost:8080";
const host = process.env.API_HOST || "localhost:8080";
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
