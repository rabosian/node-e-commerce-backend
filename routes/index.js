const express = require("express")
const router = express.Router()
const userAPI = require("./users.api")

router.use("/users", userAPI)

module.exports = router