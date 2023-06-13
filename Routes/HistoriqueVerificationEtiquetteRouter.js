const express = require("express");
const HistoriqueVerificationEtiquetteController = require("../Controllers/HistoriqueVerificationEtiquetteController");
//
const Router = express.Router();
Router.route("/")
	.get(
		HistoriqueVerificationEtiquetteController.GetAllHistoriqueVerificationEtiquette
	)
	.post(
		HistoriqueVerificationEtiquetteController.CreateHistoriqueVerificationEtiquette
	);
Router.route("/:id")
	.put(
		HistoriqueVerificationEtiquetteController.UpdateHistoriqueVerificationEtiquette
	)
	.get(
		HistoriqueVerificationEtiquetteController.GetOneHistoriqueVerificationEtiquette
	)
	.delete(
		HistoriqueVerificationEtiquetteController.DeleteHistoriqueVerificationEtiquette
	);
module.exports = Router;
