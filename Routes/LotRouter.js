const express = require('express');
const LotController = require("../Controllers/LotController")
//
const Router = express.Router();
Router.route('/')
    .get(LotController.GetAllLots)
    .post(LotController.CreateLot);
Router.route('/').post(LotController.FindByFormat)
Router.route('/:id')
    .put(LotController.UpdateLot)
    .get(LotController.GetOneLot)
    .delete(LotController.DeleteLot)
module.exports = Router;