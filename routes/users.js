const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  "/",
  [
    // validation using express-validator
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // First we need to do error check, this is done only where requests accept data(put,post)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    // we use async and await as we are connecting with database which can take some time
    try {
      let user = await User.findOne({ email: email }); //  Here check in db is user with email already exists
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({
        name,
        email,
        password,
      });
      // Now we need to add this user to db, before adding it we need to hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      // After adding the user to db, we need to make user login and show the website and respond with JWT token
      const payload = {
        user: { id: user.id },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token }); // we need to handle this token on client side
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
