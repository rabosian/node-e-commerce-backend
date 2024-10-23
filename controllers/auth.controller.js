const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {};

authController.authenticate = async (req, res, next) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) throw new Error("Invalid token, please login");

    const token = userToken.slice(7);
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) throw new Error("Invalid token, please login");
      
      req.userId = payload._id;
    });
    next();
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err.message });
  }
};

module.exports = authController;
