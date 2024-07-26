const express = require("express");
const router = express.Router();
const Schema = require("../modals/User");
const Schema1 = require("../modals/itemSchema");

// Set up routes
router.get("/v1/displayUsers", async (req, res) => {
  try {
    const items = await Schema.find({ role: "user" });
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/v1/displayAdmins", async (req, res) => {
  try {
    const items = await Schema.find({ role: { $in: ["admin", "superAdmin"] } });
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/v1/displayItems", async (req, res) => {
  try {
    const items = await Schema1.find({});
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
