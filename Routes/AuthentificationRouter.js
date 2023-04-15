const express = require('express');
const AuthentificationController = require("../Controllers/AuthentificationController");
const Router = express.Router();
Router.route('/').post(AuthentificationController.SignIn);
module.exports = Router;