const express = require('express');
const AtelierController = require("../Controllers/AtelierController")
//
const Router = express.Router();
Router.route('/')
    .get(AtelierController.GetAllAtelier)
    .post(AtelierController.CreateAtelier);
Router.route('/:id')
    .put(AtelierController.UpdateAtelier)
    .get(AtelierController.GetOneAtelier)
    .delete(AtelierController.DeleteAtelier)
module.exports = Router;