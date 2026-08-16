const express = require("express");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");
const likeRoutes = require("./routes/like.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors({
  origin: [
    'https://observant-rejoicing-production-d6f8.up.railway.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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