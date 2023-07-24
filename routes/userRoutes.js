const express = require("express");
const { register, getUserList } = require("../controller/user");

const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Email length should be 10 to 30 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("phoneNumber", "Mobile number should contains 10 digits")
      .isLength({
        min: 10,
        max: 10,
      })
      .isNumeric(),
  ],
  register
);
router.get("/user-list", getUserList);

module.exports = router;
