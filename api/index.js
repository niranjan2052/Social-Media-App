const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const Routes = require("./routes");
const cors = require("cors");
const path = require("path");

const app = express();

dotenv.config(); //Activate env file

//Connection with mongo
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MONGO"));

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));



app.use("/api", Routes);
app.use("*", (_req, res) => {
  res.status(500).send("404!! URL Not Found!");
});

app.listen(8800, () => {
  console.log("Backend server is running");
  console.log("Running on: https://localhost:8800/");
});
