const express = require("express");
const router = require("./routes");
const loadMongoose = require("./loaders/loadMongoose");
const bodyParser = require("body-parser");
const app = express();

loadMongoose().then((res) => {
  const app = express();
  app.use(bodyParser.json());

  app.get('/status', (req, res) => {
    res.json({message: "ok"})
  })

  app.use("/api", router);
  app.use("/api", (req, res) => {
    res.status(404).json({ message: "not found" });
  });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
});
