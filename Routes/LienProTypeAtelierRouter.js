const express = require('express');
const LienProTypeAtelierController = require('../Controllers/LienProTypeAtelierController')
const Router = express.Router();
Router.route('/').get(LienProTypeAtelierController.GetAllLienAtelierUAP).post(LienProTypeAtelierController.CreateLienAtelierUAP)
Router.route('/:id')
    .put(LienProTypeAtelierController.UpdateLienAtelierUAP)
    .get(LienProTypeAtelierController.GetOneLienAtelierUAP)
    .delete(LienProTypeAtelierController.DeleteLienAtelierUAP)
module.exports = Router