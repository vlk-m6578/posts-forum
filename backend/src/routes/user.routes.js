const router = require("express").Router();
const controller = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get(
  "/me",
  auth,
  controller.getMyProfile
);

router.put(
  "/profile",
  auth,
  controller.updateProfile
);

router.get(
  "/",
  auth,
  role("ADMIN"),
  controller.getAllUsers
);

router.delete(
  "/:id",
  auth,
  role("ADMIN"),
  controller.deleteUser
);

router.get(
  "/:id",
  controller.getProfile
);

module.exports = router;