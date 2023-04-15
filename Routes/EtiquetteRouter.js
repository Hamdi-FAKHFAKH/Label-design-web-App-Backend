const express = require('express');
const EtiquetteController = require("../Controllers/EtiquetteController")
//
const Router = express.Router();
Router.route('/')
    .post(EtiquetteController.CreateEtiquette)
    .get(EtiquetteController.GetAllEtiquettes)
Router.route('/:id').put(EtiquetteController.UpdateEtiquette).delete(EtiquetteController.DeleteEtiquette).get(EtiquetteController.GetOneEtiquette)

module.exports = Router;