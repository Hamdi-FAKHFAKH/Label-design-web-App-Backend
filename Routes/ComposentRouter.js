const express = require("express");
const ComposentController = require("../Controllers/ComposentController");
//
const Router = express.Router();
Router.route("/")
	.get(ComposentController.GetAllComposents)
	.post(ComposentController.CreateComposent);
Router.route("/:id")
	.put(ComposentController.UpdateComposent)
	.get(ComposentController.GetOneComposent)
	.delete(ComposentController.DeleteComposent);
Router.route("/byEtiquette/:id").delete(
	ComposentController.DeleteComposentsByIdEtiquette
);
module.exports = Router;
