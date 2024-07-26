const { Router } = require("express");
const route = Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../modals/User");
const jwtSecret = "MynameisVaibhavGupta$!232673dsxf";
route.post(
  "/v1/createuser",
  [
    body("email", "Enter a Valaid Mail").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password", "Password Must Be Min 5 Length").isLength({ min: 5 }),
  ], // Validation using express-validator
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
      await user.create({
        name: req.body.name,
        role: req.body.role || "user",
        location: req.body.location,
        email: req.body.email,
        password: secPass,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
route.post(
  "/v1/loginuser",
  [
    body("email", "Enter a Valaid Mail").isEmail(),
    body("password", "Password Must Be Min 5 Length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;

    try {
      let userData = await user.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try Login With Correct Credentials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try Login With Correct Credentials" });
      }

      const data = {
        user: {
          id: userData.id,
          role: userData.role,
        },
      };

      const awthToken = jwt.sign(data, jwtSecret, {
        expiresIn: "1h",
      });
      return res.json({ success: true, authToken: awthToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = route;
