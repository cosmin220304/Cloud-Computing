const { cronController } = require("../controllers");
const { Router } = require("express");

const router = Router();

router.post("/cron/email", cronController.sendNotifications);

module.exports = router;
