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
    const user = await User.findOne({ email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        res
          .status(200)
          .json({ status: "Success", user, accessToken, refreshToken });
        return
      }
    }
    throw new Error("Email and password NOT match");
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};

userController.findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      res.status(404).json({ status: "Failed", error: "User NOT found" });
    res.status(200).json({ status: "Success", user });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err.message });
  }
};

module.exports = userController;
