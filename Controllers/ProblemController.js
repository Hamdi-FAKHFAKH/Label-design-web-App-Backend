const Problem = require("../Models/ProblemModel");
exports.CreateProblem = async (req, res) => {
	try {
		const tag = await Problem.create(req.body);
		res.status(201).json({
			Status: "Problem Created Successfully",
			tag,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Failed Problem Creation",
			erreur: err,
		});
	}
};
exports.GetAllProblem = async (req, res) => {
	try {
		const tags = await Problem.findAll();
		res.status(200).json({
			Status: "Succes",
			tags,
		});
	} catch (error) {
		res.status(400).json({
			Status: "Problem Not Found",
			erreur: error,
		});
	}
};
exports.UpdateProblem = async (req, res) => {
	try {
		n = await Problem.update(req.body, {
			where: { id: req.params.id },
			returning: true,
		});
		n[0] >= 1
			? res.status(200).json({
					Status: "Problem Updated Successfully",
					"number of affected rows": n[0],
					UtilisateurUpdated: n[1],
			  })
			: res.status(302).json({
					Status: "Problem Not Found",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Problem Update Failed ",
			erreur: error,
		});
	}
};
exports.DeleteProblem = async (req, res) => {
	try {
		n = await Problem.destroy({ where: { id: req.params.id } }); // autre Méthode
		n >= 1
			? res.status(200).json({
					Status: "Problem Deleted Successfully",
					"number of affected rows": n,
			  })
			: res.status(302).json({
					Status: "Problem Not Found",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Problem Deleted Failed",
			msg: "Problem est associer a un autre Problem comme superviseur ",
			erreur: error,
		});
	}
};
exports.GetOneProblem = async (req, res) => {
	try {
		tag = await Problem.findByPk(req.params.id); // autre Méthode
		// n = await Produit.upsert(req.body)
		if (tag != null) {
			res.status(200).json({
				Status: "Succes",
				tag,
			});
		} else {
			throw new Error("Problem not Found");
		}
	} catch (error) {
		res.status(400).json({
			Status: "Problem Not Found",
			erreur: error,
		});
	}
};
