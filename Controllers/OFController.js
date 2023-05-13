const OF = require("../Models/OFModel");
exports.CreateOF = async (req, res) => {
	try {
		const of = await OF.create(req.body);
		res.status(201).json({
			Status: "OF créer avec Succées",
			of,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Echec de création de client",
			erreur: err,
		});
	}
};
exports.GetAllOF = async (req, res) => {
	try {
		const of = await OF.findAll();
		res.status(200).json({
			Status: "Succes",
			of,
		});
	} catch (error) {
		res.status(400).json({
			Status: "OF n'existe pas",
			erreur: error,
		});
	}
};
exports.UpdateOF = async (req, res) => {
	try {
		n = await OF.update(req.body, {
			where: { ofnum: req.params.id },
			returning: true,
		}); // autre Méthode
		// n = await Produit.upsert(req.body)
		n[0] >= 1
			? res.status(200).json({
					Status: "OF Modifié avec Succès",
					numberOfAffectedRows: n[0],
					ClientUpdated: n[1],
			  })
			: res.status(302).json({
					Status: "OF n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Modification de OF",
			erreur: error,
		});
	}
};
exports.DeleteOF = async (req, res) => {
	try {
		n = await OF.destroy({ where: { ofnum: req.params.id } }); // autre Méthode
		// n = await Produit.upsert(req.body)
		n >= 1
			? res.status(200).json({
					Status: "OF Supprimer avec Succés",
					"number of affected rows": n,
			  })
			: res.status(302).json({
					Status: "OF n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Suppression de OF",
			erreur: error,
		});
	}
};
exports.GetOneOF = async (req, res) => {
	try {
		of = await OF.findByPk(req.params.id);
		if (of != null) {
			res.status(200).json({
				Status: "Succes",
				of,
			});
		} else {
			throw new Error("OF n'existe pas");
		}
	} catch (error) {
		res.status(204).json({
			Status: "OF n'existe pas",
			erreur: error,
		});
	}
};
