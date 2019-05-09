const express = require("express");

const routes = express.Router();

const ToolController = require("./app/controllers/ToolController");
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");

const authMiddleware = require("./app/middlewares/auth");

//User
routes.post("/auth", UserController.store);
routes.post("/login", SessionController.store);

routes.use(authMiddleware);

//Tools CRUD
routes.get("/tools", ToolController.index);
routes.post("/tools", ToolController.store);
routes.delete("/tools/:id", ToolController.destroy);

module.exports = routes;
