const mongoose = require("mongoose");

const Tool = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tool", Tool);
