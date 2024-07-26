const { Router } = require("express");
const route = Router();
const categorySchema = require("../modals/categorySchema");
const itemSchema = require("../modals/itemSchema");

route.post("/v1/addcategory", async (req, res) => {
  try {
    await categorySchema.create({
      CategoryName: req.body.name,
    });
    res.status(200).send("Category Added Successfully");
  } catch (error) {
    console.log(error);
    res.json({ Success: false });
  }
});

route.post("/v1/additem", async (req, res) => {
  try {
    await itemSchema.create({
      CategoryName: req.body.CategoryName,
      name: req.body.name,
      img: req.body.img,
      options: req.body.options,
      desciption: req.body.desciption,
    });
    res.status(200).send("Category Added Successfully");
  } catch (error) {
    console.log(error);
    res.json({ Success: false });
  }
});

route.get("/v1/categories", async (req, res) => {
  try {
    const categories = await categorySchema.find(
      {},
      { CategoryName: 1, _id: 0 }
    ); // Retrieve only CategoryName field
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
});

module.exports = route;
