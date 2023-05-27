const express = require("express");
const EtiquettesImprimeesController = require("../Controllers/EtiquettesImprimeesController");
//
const Router = express.Router();
Router.route("/")
	.post(EtiquettesImprimeesController.CreateEtiquetteImprimee)
	.get(EtiquettesImprimeesController.GetAllEtiquettesImprimees);
Router.route("/printDetail").get(EtiquettesImprimeesController.GetPrintDetail);
Router.route("/:id")
	.put(EtiquettesImprimeesController.UpdateEtiquetteImprimee)
	.delete(EtiquettesImprimeesController.DeleteEtiquetteImprimee)
	.get(EtiquettesImprimeesController.GetOneEtiquetteImprimee);

module.exports = Router;
