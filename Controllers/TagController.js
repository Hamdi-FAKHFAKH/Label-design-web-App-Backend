const Tag = require("../Models/TagModel");
exports.CreateTag = async (req, res) => {
	try {
		const tag = await Tag.create(req.body);
		res.status(201).json({
			Status: "Tag Created Successfully",
			tag,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Failed Tag Creation",
			erreur: err,
		});
	}
};
exports.GetAllTag = async (req, res) => {
	try {
		const tags = await Tag.findAll();
		res.status(200).json({
			Status: "Succes",
			tags,
		});
	} catch (error) {
		res.status(400).json({
			Status: "Tag Not Found",
			erreur: error,
		});
	}
};
exports.UpdateTag = async (req, res) => {
	try {
		n = await Tag.update(req.body, {
			where: { id: req.params.id },
			returning: true,
		});
		n[0] >= 1
			? res.status(200).json({
					Status: "Tag Updated Successfully",
					"number of affected rows": n[0],
					UtilisateurUpdated: n[1],
			  })
			: res.status(302).json({
					Status: "Tag Not Found",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Tag Update Failed ",
			erreur: error,
		});
	}
};
exports.DeleteTag = async (req, res) => {
	try {
		n = await Tag.destroy({ where: { id: req.params.id } }); // autre Méthode
		n >= 1
			? res.status(200).json({
					Status: "Tag Deleted Successfully",
					"number of affected rows": n,
			  })
			: res.status(302).json({
					Status: "Tag Not Found",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Tag Deleted Failed",
			msg: "Tag est associer a un autre Tag comme superviseur ",
			erreur: error,
		});
	}
};
exports.GetOneTag = async (req, res) => {
	try {
		tag = await Tag.findByPk(req.params.id); // autre Méthode
		// n = await Produit.upsert(req.body)
		if (tag != null) {
			res.status(200).json({
				Status: "Succes",
				tag,
			});
		} else {
			throw new Error("Tag not Found");
		}
	} catch (error) {
		res.status(400).json({
			Status: "Tag Not Found",
			erreur: error,
		});
	}
};
