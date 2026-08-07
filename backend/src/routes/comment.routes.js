const router =
  require("express").Router();


const controller =
  require("../controllers/comment.controller");


const auth =
  require("../middleware/auth.middleware");


const role =
  require("../middleware/role.middleware");



router.post(
  "/",
  auth,
  controller.create
);



router.get(
  "/post/:postId",
  controller.getByPost
);



router.delete(
  "/:id",
  auth,
  controller.remove
);



module.exports = router;