const HistoriqueVerificationEtiquette = require("../Models/HistoriqueVerificationEtiquetteModel");
exports.CreateHistoriqueVerificationEtiquette = async (req, res) => {
	try {
		const historiqueProduit = await HistoriqueVerificationEtiquette.create(
			req.body
		);
		res.status(201).json({
			Status: "HistoriqueVerificationEtiquette créer avec Succées",
			historiqueProduit,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Echec de création de HistoriqueVerificationEtiquette",
			erreur: err,
		});
	}
};
exports.GetAllHistoriqueVerificationEtiquette = async (req, res) => {
	try {
		const historiqueProduit = await HistoriqueVerificationEtiquette.findAll();
		res.status(200).json({
			Status: "Succes",
			historiqueProduit,
		});
	} catch (error) {
		res.status(400).json({
			Status: "HistoriqueVerificationEtiquette n'existe pas",
			erreur: error,
		});
	}
};
exports.UpdateHistoriqueVerificationEtiquette = async (req, res) => {
	try {
		n = await HistoriqueVerificationEtiquette.update(req.body, {
			where: { id: req.params.id },
			returning: true,
		});
		n[0] >= 1
			? res.status(200).json({
					Status: "HistoriqueVerificationEtiquette Modifié avec Succès",
					numberOfAffectedRows: n[0],
					HistoriqueProduitUpdated: n[1],
			  })
			: res.status(302).json({
					Status: "HistoriqueVerificationEtiquette n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Modification de HistoriqueVerificationEtiquette",
			erreur: error,
		});
	}
};
exports.DeleteHistoriqueVerificationEtiquette = async (req, res) => {
	try {
		n = await HistoriqueVerificationEtiquette.destroy({
			where: { refProd: req.params.id },
		});
		n >= 1
			? res.status(200).json({
					Status: "HistoriqueVerificationEtiquette Supprimer avec Succés",
					"number of affected rows": n,
			  })
			: res.status(302).json({
					Status: "Utilisateur n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Suppression de HistoriqueVerificationEtiquette",
			msg: "utilisateur est associer a un autre utilisateur comme superviseur ",
			erreur: error,
		});
	}
};
exports.GetOneHistoriqueVerificationEtiquette = async (req, res) => {
	try {
		historiqueProduit = await HistoriqueVerificationEtiquette.findByPk(
			req.params.id
		); // autre Méthode
		console.log(HistoriqueVerificationEtiquette);
		if (historiqueProduit != null) {
			res.status(200).json({
				Status: "Succes",
				historiqueProduit,
			});
		} else {
			res.status(204).json({
				Status: "HistoriqueVerificationEtiquette Not Found",
			});
		}
	} catch (error) {
		res.status(400).json({
			Status: "HistoriqueVerificationEtiquette n'existe pas",
			erreur: error,
		});
	}
};
