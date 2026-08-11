const router = require("express").Router();

const controller =
  require("../controllers/post.controller");

const auth =
  require("../middleware/auth.middleware");

const upload =
  require("../middleware/upload.middleware");

router.post(
  "/",
  auth,
  upload.array("images", 4),
  controller.create
);

router.get(
  "/my",
  auth,
  controller.getMy
);

router.get(
  "/",
  auth,
  controller.getAll
);


router.get(
  "/:id",
  controller.getOne
);


router.put(
  "/:id",
  auth,
  upload.array("images", 4),
  controller.update
);


router.delete(
  "/:id",
  auth,
  controller.remove
);



module.exports = router;