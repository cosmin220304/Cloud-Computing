const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware("/api", { 
    target: "https://seatr-the-best-api.azurewebsites.net",
    changeOrigin: true,
  }));
};