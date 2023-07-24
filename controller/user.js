const User = require("../models/User");
const { validationResult } = require("express-validator");

//Register user
const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    }
    const { firstName, lastName, email, phoneNumber } = req.body;

    let newUser = await User.find({
      email: email,
      phoneNumber: phoneNumber,
    });
    if (newUser) {
      res.status(500).json({ error: "User already exist" });
    }
    newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Users list
const getUserList = async (req, res) => {
  try {
    const userList = await User.find({});
    console.log(userList, "userList");
    return res.status(200).json({
      success: true,
      data: userList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, getUserList };
