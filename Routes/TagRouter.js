const express = require("express");
const TagController = require("../Controllers/TagController");
//
const Router = express.Router();
Router.route("/").post(TagController.CreateTag).get(TagController.GetAllTag);
Router.route("/:id")
	.put(TagController.UpdateTag)
	.delete(TagController.DeleteTag)
	.get(TagController.GetOneTag);

module.exports = Router;
