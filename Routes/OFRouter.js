const express = require("express");
const OFController = require("../Controllers/OFController");
//
const Router = express.Router();
Router.route("/").get(OFController.GetAllOF).post(OFController.CreateOF);
Router.route("/:id")
	.put(OFController.UpdateOF)
	.get(OFController.GetOneOF)
	.delete(OFController.DeleteOF);
module.exports = Router;
