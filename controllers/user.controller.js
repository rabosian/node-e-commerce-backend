const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("user already exists");
    }

    if (!password || password.trim() === "") {
      throw new Error("password cannot be empty");
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, email, password: hash, role });
    await newUser.save();
    res.status(201).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "failed", error: err.message });
  }
};

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (bcrypt.compareSync(password, existingUser.password)) {
        const accessToken = existingUser.generateAccessToken();
        const refreshToken = existingUser.generateRefreshToken();
        res.status(200).json({ status: "Success", existingUser, accessToken, refreshToken });
      }
    }
    throw new Error("Email and password NOT match");
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

module.exports = userController;
