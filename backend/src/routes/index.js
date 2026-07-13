const router = require("express").Router();


const authRoutes =
  require("./auth.routes");

const postRoutes =
  require("./post.routes");


router.use(
  "/auth",
  authRoutes
);

router.use(
  "/posts",
  postRoutes
);


router.get("/health", (req, res) => {

  res.json({
    status: "OK"
  });

});


module.exports = router;