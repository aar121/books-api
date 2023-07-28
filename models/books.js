const mongoose = require("mongoose");
require("dotenv").config();

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageURL: { type: String, default: "http://placekitten.com/350/350" },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  year: {
    type: Number,
  },
});

module.exports = mongoose.model("Book", bookSchema);