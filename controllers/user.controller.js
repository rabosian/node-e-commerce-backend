const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400), json({ error: "user already exists" });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(201).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "failed", error: err.message });
  }
};

module.exports = userController;
