const router = require("express").Router();


const authRoutes =
  require("./auth.routes");


router.use(
  "/auth",
  authRoutes
);



router.get("/health", (req, res) => {

  res.json({
    status: "OK"
  });

});


module.exports = router;