const express = require("express");
const HistoriqueProduitController = require("../Controllers/HistoriqueProduitController");
//
const Router = express.Router();
Router.route("/")
	.get(HistoriqueProduitController.GetAllHistoriqueProduit)
	.post(HistoriqueProduitController.CreateHistoriqueProduit);
Router.route("/:id")
	.put(HistoriqueProduitController.UpdateHistoriqueProduit)
	.get(HistoriqueProduitController.GetOneHistoriqueProduit)
	.delete(HistoriqueProduitController.DeleteHistoriqueProduit);
module.exports = Router;
