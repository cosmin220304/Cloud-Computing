const { Router } = require("express");
const { userController } = require("../controllers");
const { userValidator } = require("../schemas");

const router = Router();

router.get("/user", userController.getUsers);
router.get("/user/:uid", userController.getUserByUid);
router.post(
  "/user",
  userValidator,
  userController.createUser
);
router.put(
  "/user/:uid",
  userController.updateUserByUid
);
router.delete(
  "/user/:uid",
  userController.removeUserByUid
);

module.exports = router;
