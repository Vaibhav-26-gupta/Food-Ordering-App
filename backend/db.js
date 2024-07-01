const mongoose = require("mongoose");
const Schema1 = require("./modals/itemSchema");
const Schema2 = require("./modals/categorySchema");
const URL = "mongodb://localhost:27017/gofood";

const dbConnectionString = async () => {
  await mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .then(async () => {
      const itemsData = await Schema1.find();
      console.log("itemsdata fetched");
      const categoriesData = await Schema2.find();
      console.log("categoriesData fetched");
      global.food_items = itemsData;
      global.food_categories = categoriesData;
    })
    .catch((Error) => console.log("Error :   ", Error));
};

module.exports = dbConnectionString;
