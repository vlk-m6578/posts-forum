const router = require("express").Router();


const authRoutes =
  require("./auth.routes");

const postRoutes =
  require("./post.routes");

const commentRoutes =
  require("./comment.routes");

router.use(
  "/auth",
  authRoutes
);

router.use(
  "/posts",
  postRoutes
);

router.use(
  "/comments",
  commentRoutes
);

router.get("/health", (req, res) => {

  res.json({
    status: "OK"
  });

});


module.exports = router;