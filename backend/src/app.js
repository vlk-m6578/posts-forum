const express = require("express");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");
const likeRoutes = require("./routes/like.routes");
const userRoutes = require("./routes/user.routes");

const app = express();


app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

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