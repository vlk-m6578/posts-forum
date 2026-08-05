const router = require("express").Router();
const controller = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

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
  "/:id",
  controller.getProfile
);

module.exports = router;