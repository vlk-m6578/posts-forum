const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const likeRoutes = require("./routes/like.routes");
const userRoutes = require("./routes/user.routes");

const app = express();


app.use(cors());

app.use(express.json());


app.use("/api", routes);

app.use(
  "/api/likes",
  likeRoutes
);

app.use(
  "/api/users",
  userRoutes
);

module.exports = app;