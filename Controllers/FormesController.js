const Formes = require("../Models/FormesModel");
exports.CreateForm = async (req, res) => {
	try {
		const form = await Formes.create(req.body);
		res.status(201).json({
			Status: "Formes créer avec Succées",
			form,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Echec de création de Formes",
			erreur: err,
		});
	}
};
exports.GetAllForms = async (req, res) => {
	try {
		const forms = await Formes.findAll();
		res.status(200).json({
			Status: "Succes",
			forms,
		});
	} catch (error) {
		res.status(400).json({
			Status: "Formes n'existe pas",
			erreur: error,
		});
	}
};
exports.UpdateForm = async (req, res) => {
	try {
		n = await Formes.update(req.body, {
			where: { id: req.params.id },
			returning: true,
		}); // autre Méthode
		// n = await Produit.upsert(req.body)
		n[0] >= 1
			? res.status(200).json({
					Status: "Formes Modifié avec Succès",
					numberOfAffectedRows: n[0],
					UtilisateurUpdated: n[1],
			  })
			: res.status(302).json({
					Status: "Formes n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Modification de Formes",
			erreur: error,
		});
	}
};
exports.DeleteForm = async (req, res) => {
	try {
		n = await Formes.destroy({
			where: { id: req.params.id },
		}); // autre Méthode
		// n = await Produit.upsert(req.body)
		n >= 1
			? res.status(200).json({
					Status: "Formes Supprimer avec Succés",
					"number of affected rows": n,
			  })
			: res.status(302).json({
					Status: "Utilisateur n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Suppression de Formes",
			msg: "utilisateur est associer a un autre utilisateur comme superviseur ",
			erreur: error,
		});
	}
};
exports.GetOneForm = async (req, res) => {
	try {
		form = await Formes.findByPk(req.params.id); // autre Méthode
		// n = await Produit.upsert(req.body)
		console.log(Formes);
		if (form != null) {
			res.status(200).json({
				Status: "Succes",
				form,
			});
		} else {
			res.status(204).json({
				Status: "Formes Not Found",
			});
		}
	} catch (error) {
		res.status(400).json({
			Status: "Formes n'existe pas",
			erreur: error,
		});
	}
};
