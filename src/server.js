const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const databaseConfig = require("./config/database");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.database();
    this.middleware();
    this.routes();
  }

  database() {
    //mongodb://user:pass@localhost:27017/nomedatabase
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middleware() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(morgan("dev"));
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
