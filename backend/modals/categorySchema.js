const mongoose = require("mongoose");

const categoryScehma = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
});

module.exports = mongoose.model("Schema2", categoryScehma, "food_Categories");
