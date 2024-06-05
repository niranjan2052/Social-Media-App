const express = require("express");
const usersRoute = require("./users");
const postsRoute = require("./posts");
const authRoute = require("./auth");
const multer = require("multer");

const router = express.Router();
//File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
router.post("/upload", upload.single("file"), (_req, res) => {
  try {
    return res.status(200).json("File Uploaded Successfully");
  } catch (error) {
    console.log(error);
  }
});

router.use("/users", usersRoute);
router.use("/auth", authRoute);
router.use("/posts", postsRoute);

module.exports = router;
