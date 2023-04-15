const express = require('express');
const SDTPRAController = require("../Controllers/SDTPRAController")
//
const Router = express.Router();
Router.route('/').get(SDTPRAController.GetAllSDTPRA).post(SDTPRAController.CreateSDTPRA)
Router.route('/:id').get(SDTPRAController.GetOneSDTPRA).put(SDTPRAController.UpdateSDTPRA).delete(SDTPRAController.DeleteSDTPRA)
module.exports = Router