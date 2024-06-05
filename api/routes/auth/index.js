const express = require("express");
const { Auth } = require("../../controllers");

const router = express.Router();

router.route("/register").post(Auth.RegisterController.register);

router.route("/login").post(Auth.LoginController.login);

module.exports = router;
