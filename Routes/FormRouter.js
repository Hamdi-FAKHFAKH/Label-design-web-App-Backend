const express = require("express");
const FormController = require("../Controllers/FormesController");
//
const Router = express.Router();
Router.route("/")
	.get(FormController.GetAllForms)
	.post(FormController.CreateForm);
Router.route("/:id")
	.put(FormController.UpdateForm)
	.get(FormController.GetOneForm)
	.delete(FormController.DeleteForm);
module.exports = Router;
