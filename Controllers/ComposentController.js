const Composent = require("../Models/ComposentModel");
exports.CreateComposent = async (req, res) => {
	try {
		const composent = await Composent.create(req.body);
		res.status(201).json({
			Status: "Composent créer avec Succées",
			composent,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Echec de création de Composent",
			erreur: err,
		});
	}
};
exports.GetAllComposents = async (req, res) => {
	try {
		if (req.query.idEtiquette) {
			composents = await Composent.findAll({
				where: { refEtiquette: req.query.idEtiquette },
			}); // autre Méthode
			// n = await Produit.upsert(req.body)
			console.log(Composent);
			if (composents != null) {
				res.status(200).json({
					Status: "Succes",
					composents,
				});
			}
		} else {
			const composents = await Composent.findAll();
			res.status(200).json({
				Status: "Succes",
				composents,
			});
		}
	} catch (error) {
		res.status(400).json({
			Status: "aucun Composent existe",
			erreur: error,
		});
	}
};
exports.UpdateComposent = async (req, res) => {
	try {
		n = await Composent.update(req.body, {
			where: { id: req.params.id },
			returning: true,
		}); // autre Méthode
		// n = await Produit.upsert(req.body)
		n[0] >= 1
			? res.status(200).json({
					Status: "Composent Modifié avec Succès",
					numberOfAffectedRows: n[0],
					ClientUpdated: n[1],
			  })
			: res.status(302).json({
					Status: "Composent n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Modification de Composent",
			erreur: error,
		});
	}
};
exports.DeleteComposent = async (req, res) => {
	try {
		n = await Composent.destroy({ where: { id: req.params.id } }); // autre Méthode
		// n = await Produit.upsert(req.body)
		n >= 1
			? res.status(200).json({
					Status: "Composent Supprimer avec Succés",
					numberOfAffectedRows: n,
			  })
			: res.status(302).json({
					Status: "Composent n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Suppression de Composent",
			erreur: error,
		});
	}
};
exports.DeleteComposentsByIdEtiquette = async (req, res) => {
	try {
		n = await Composent.destroy({
			where: { refEtiquette: req.query.idEtiquette },
		});
		n >= 1
			? res.status(200).json({
					Status: "Composents Supprimer avec Succés",
					numberOfAffectedRows: n,
			  })
			: res.status(302).json({
					Status: "ucun composant supprimé",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Suppression de Composent",
			erreur: error,
		});
	}
};
exports.GetOneComposent = async (req, res) => {
	try {
		composent = await Composent.findByPk(req.params.id); // autre Méthode
		// n = await Produit.upsert(req.body)
		console.log(composent);
		if (composent != null) {
			res.status(200).json({
				Status: "Succes",
				composent,
			});
		} else {
			throw new Error("Composent n'existe pas");
		}
	} catch (error) {
		res.status(204).json({
			Status: "Composent n'existe pas",
			erreur: error,
		});
	}
};
