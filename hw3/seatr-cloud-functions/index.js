const express = require("express");
const router = require("./routes");

// Create an Express object and routes (in order)
const app = express();
app.use("/api", router);
app.use("/api", (req, res) => {
  res.status(404).json({ message: "not found" });
});

// Set our GCF handler to our Express app.
module.exports.app = app;
