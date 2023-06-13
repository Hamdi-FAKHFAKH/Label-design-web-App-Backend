const express = require("express");
const ProblemController = require("../Controllers/ProblemController");
//
const Router = express.Router();
Router.route("/")
	.post(ProblemController.CreateProblem)
	.get(ProblemController.GetAllProblem);
Router.route("/:id")
	.put(ProblemController.UpdateProblem)
	.delete(ProblemController.DeleteProblem)
	.get(ProblemController.GetOneProblem);

module.exports = Router;
