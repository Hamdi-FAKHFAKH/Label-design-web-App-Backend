const express = require('express');
const FournisseurController = require("../Controllers/FournisseurController")
//
const Router = express.Router();
Router.route('/')
    .get(FournisseurController.GetAllFournisseur)
    .post(FournisseurController.CreateFournisseur);
Router.route('/:id')
    .put(FournisseurController.UpdateFournisseur)
    .get(FournisseurController.GetOneFournisseur)
    .delete(FournisseurController.DeleteFournisseur)
module.exports = Router;