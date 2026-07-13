const router = require("express").Router();

const controller =
  require("../controllers/user.controller");

router.get(
  "/:id",
  controller.getProfile
);

module.exports = router;