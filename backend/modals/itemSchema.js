const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  options: {
    type: Array,
  },
  desciption: {
    type: String,
  },
});

module.exports = mongoose.model("Schema1", itemSchema, "food_items");
