const router = require("express").Router();
const controller = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get(
  "/:id",
  controller.getProfile
);


router.get(
  "/profile/me",
  auth,
  controller.getMyProfile
);

router.put(
  "/profile",
  auth,
  controller.updateProfile
);

module.exports = router;