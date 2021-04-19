const express = require("express");
const router = require("./routes");
const loadMongoose = require("./loaders/loadMongoose");
const bodyParser = require("body-parser");

loadMongoose().then((res) => {
  const app = express();
  app.use(bodyParser.json());
  app.use("/api", router);
  app.use("/api", (req, res) => {
    res.status(404).json({ message: "not found" });
  });
  app.listen(8080, () => {
    console.log("listening on 8080");
  });
});
