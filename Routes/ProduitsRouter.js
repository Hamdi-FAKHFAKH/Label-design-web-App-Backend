const express = require("express");
const ProduitController = require("../Controllers/ProduitController");
const AuthentificationController = require("../Controllers/AuthentificationController");
//
const Router = express.Router();
Router.route("/")
	.post(ProduitController.CreateProduit)
	.get(ProduitController.GetAllProduits);
Router.route("/allData").get(ProduitController.GetAllProduitsData);
Router.route("/:id")
	.put(ProduitController.UpdateProduit)
	.delete(ProduitController.DeleteProduit)
	.get(ProduitController.GetOneProduit);

module.exports = Router;
