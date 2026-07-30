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
  controller.getAll
);


router.get(
  "/:id",
  controller.getOne
);


router.post(
  "/",
  auth,
  controller.create
);

router.put(
  "/:id",
  auth,
  controller.update
);


router.delete(
  "/:id",
  auth,
  controller.remove
);



module.exports = router;