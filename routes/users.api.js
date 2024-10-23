const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

router.post("/signup", userController.signup);

// for login request
router.post("/login", userController.login);
// for identify user on initial page load
router.get("/auth", authController.authenticate, userController.findUserById)

module.exports = router;
