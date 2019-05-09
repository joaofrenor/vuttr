const express = require("express");

const routes = express.Router();

const ToolController = require("./app/controllers/ToolController");

//Tools CRUD
routes.get("/tools", ToolController.index);
routes.post("/tools", ToolController.store);
routes.delete("/tools/:id", ToolController.destroy);

module.exports = routes;
