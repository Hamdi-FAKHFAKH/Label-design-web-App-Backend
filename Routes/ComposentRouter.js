const express = require("express");
const ComposentController = require("../Controllers/ComposentController");
//
const Router = express.Router();
Router.route("/")
	.get(ComposentController.GetAllComposents)
	.post(ComposentController.CreateComposent)
	.delete(ComposentController.DeleteComposentsByIdEtiquette);
Router.route("/:id")
	.put(ComposentController.UpdateComposent)
	.get(ComposentController.GetOneComposent)
	.delete(ComposentController.DeleteComposent);
module.exports = Router;
