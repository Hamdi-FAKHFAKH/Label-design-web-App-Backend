const express = require("express");
const AuthentificationController = require("../Controllers/AuthentificationController");
const Router = express.Router();
Router.route("/SignIn").post(AuthentificationController.SignIn);
Router.route("/checkPassword").post(AuthentificationController.CheckPassword);

module.exports = Router;
