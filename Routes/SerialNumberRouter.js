const express = require('express');
const SerialNumberController = require("../Controllers/SerialNumberController")
const Router = express.Router();
Router.route('/')
    .post(SerialNumberController.CreateSerialNumber)
    .get(SerialNumberController.GetAllSerialNumber)
Router.route('/:id').put(SerialNumberController.UpdateSerialNumber).delete(SerialNumberController.DeleteSerialNumber).get(SerialNumberController.GetOneSerialNumber)

module.exports = Router;