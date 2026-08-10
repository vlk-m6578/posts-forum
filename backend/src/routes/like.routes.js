const router = require("express").Router();

const controller = require("../controllers/like.controller");

const auth = require("../middleware/auth.middleware");



router.post(
  "/:postId",
  auth,
  controller.addLike
);



router.delete(
  "/:postId",
  auth,
  controller.removeLike
);


router.get(
  "/status/:postId",
  auth,
  controller.getLikeStatus
);


module.exports = router;