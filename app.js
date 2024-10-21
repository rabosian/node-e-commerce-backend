const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", router)

const mongoURI = process.env.DB_URI_LOCAL;

mongoose
  .connect(mongoURI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Failed to connect DB: ", err));

app.listen(process.env.PORT || 3000, (err) => {
    if(err) {
        console.log("server error: ", err)
        return
    }
    console.log("Server running on ", process.env.PORT)
})
