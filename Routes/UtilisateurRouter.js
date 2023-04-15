const express = require('express');
const UtilisateurController = require("../Controllers/UtilisateursController")
//
const Router = express.Router();
Router.route('/')
    .post(UtilisateurController.CreateUtilisateur)
    .get(UtilisateurController.GetAllUtilisateurs)
Router.route('/:id').put(UtilisateurController.UpdateUtilisateur).delete(UtilisateurController.DeleteUtilisateur).get(UtilisateurController.GetOneUtilisateur)

module.exports = Router;