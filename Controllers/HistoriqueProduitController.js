const HistoriqueProduit = require("../Models/HistoriqueProduitModel");
const sequelize = require("../ConnexionDB");
exports.CreateHistoriqueProduit = async (req, res) => {
	try {
		const historiqueProduit = await HistoriqueProduit.create(req.body);
		res.status(201).json({
			Status: "HistoriqueProduit créer avec Succées",
			historiqueProduit,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Echec de création de HistoriqueProduit",
			erreur: err,
		});
	}
};
exports.GetAllHistoriqueProduit = async (req, res) => {
	try {
		if (req.query.userMatricule && req.query.operation !== undefined) {
			console.log("ddddd");
			console.log(req.query.operation);
			historiqueProduit = await HistoriqueProduit.findAll({
				attributes: [
					[sequelize.fn("COUNT", sequelize.col("id")), "total"],
					"operation",
					[sequelize.fn("DAY", sequelize.col("createdAt")), "day"],
					[sequelize.fn("MONTH", sequelize.col("createdAt")), "month"],
					[sequelize.fn("YEAR", sequelize.col("createdAt")), "year"],
				],
				where: {
					userMatricule: req.query.userMatricule,
				},
				group: [
					[sequelize.fn("DAY", sequelize.col("createdAt")), "day"],
					[sequelize.fn("MONTH", sequelize.col("createdAt")), "month"],
					[sequelize.fn("YEAR", sequelize.col("createdAt")), "year"],
					"operation",
				],
			}); // autre Méthode
			if (historiqueProduit != null) {
				res.status(200).json({
					Status: "Succes",
					historiqueProduit,
				});
			}
		}
		if (req.query.userMatricule) {
			historiqueProduit = await HistoriqueProduit.findAll({
				where: {
					userMatricule: req.query.userMatricule,
				},
			}); // autre Méthode
			if (historiqueProduit != null) {
				res.status(200).json({
					Status: "Succes",
					historiqueProduit,
				});
			} else {
				res.status(204).send();
			}
		} else {
			const historiqueProduit = await HistoriqueProduit.findAll();
			// {
			// 	limit: req.query.limit,
			// 	offset: req.query.offset,
			// }
			res.status(200).json({
				Status: "Succes",
				historiqueProduit,
			});
		}
	} catch (error) {
		res.status(400).json({
			Status: "HistoriqueProduit n'existe pas",
			erreur: error,
		});
	}
};
exports.UpdateHistoriqueProduit = async (req, res) => {
	try {
		n = await HistoriqueProduit.update(req.body, {
			where: { refProd: req.params.id },
			returning: true,
		});
		n[0] >= 1
			? res.status(200).json({
					Status: "HistoriqueProduit Modifié avec Succès",
					numberOfAffectedRows: n[0],
					HistoriqueProduitUpdated: n[1],
			  })
			: res.status(302).json({
					Status: "HistoriqueProduit n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Modification de HistoriqueProduit",
			erreur: error,
		});
	}
};
exports.DeleteHistoriqueProduit = async (req, res) => {
	try {
		n = await HistoriqueProduit.destroy({
			where: { refProd: req.params.id },
		});
		n >= 1
			? res.status(200).json({
					Status: "HistoriqueProduit Supprimer avec Succés",
					"number of affected rows": n,
			  })
			: res.status(302).json({
					Status: "Utilisateur n'existe pas",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Echec de Suppression de HistoriqueProduit",
			msg: "utilisateur est associer a un autre utilisateur comme superviseur ",
			erreur: error,
		});
	}
};
exports.GetOneHistoriqueProduit = async (req, res) => {
	try {
		historiqueProduit = await HistoriqueProduit.findByPk(req.params.id); // autre Méthode
		console.log(HistoriqueProduit);
		if (historiqueProduit != null) {
			res.status(200).json({
				Status: "Succes",
				historiqueProduit,
			});
		} else {
			res.status(204).json({
				Status: "HistoriqueProduit Not Found",
			});
		}
	} catch (error) {
		res.status(400).json({
			Status: "HistoriqueProduit n'existe pas",
			erreur: error,
		});
	}
};
