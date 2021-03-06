const { authController } = require("../controllers");
const { Router } = require("express");
const { loginValidator, registerValidator } = require("../schmas");

const router = Router();

router.post("/login", loginValidator, authController.login);
router.post("/register", registerValidator, authController.register);
router.post("/sms", authController.generateAuthCode);

module.exports = router;
