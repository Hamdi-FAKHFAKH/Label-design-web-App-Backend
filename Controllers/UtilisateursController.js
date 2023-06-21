const Utilisateur = require("../Models/UtilisateurModel");
exports.CreateUtilisateur = async (req, res) => {
	try {
		const utilisateur = await Utilisateur.create(req.body);
		res.status(201).json({
			Status: "Utilisateur Created Successfully",
			utilisateur: utilisateur,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Failed utilisateur Creation",
			erreur: err,
		});
	}
};
exports.GetAllUtilisateurs = async (req, res) => {
	try {
		const utilisateur = await Utilisateur.findAll();
		res.status(200).json({
			Status: "Succes",
			utilisateur: utilisateur,
		});
	} catch (error) {
		res.status(400).json({
			Status: "utilisateur Not Found",
			erreur: error,
		});
	}
};
exports.UpdateUtilisateur = async (req, res) => {
	try {
		n = await Utilisateur.update(req.body, {
			where: { matricule: req.params.id },
			returning: true,
		});
		n[0] >= 1
			? res.status(200).json({
					Status: "utilisateur Updated Successfully",
					numberOfAffectedRows: n[0],
					UtilisateurUpdated: n[1],
			  })
			: res.status(302).json({
					Status: "Utilisateur Not Found",
			  });
	} catch (error) {
		console.log("failed");
		console.log(error);
		res.status(400).json({
			Status: "utilisateur Update Failed ",
			erreur: error,
		});
	}
};
exports.DeleteUtilisateur = async (req, res) => {
	try {
		n = await Utilisateur.destroy({ where: { matricule: req.params.id } }); // autre Méthode
		// n = await Produit.upsert(req.body)
		n >= 1
			? res.status(200).json({
					Status: "Utilisateur Deleted Successfully",
					"number of affected rows": n,
			  })
			: res.status(302).json({
					Status: "Utilisateur Not Found",
			  });
	} catch (error) {
		res.status(400).json({
			Status: "Utilisateur Deleted Failed",
			msg: "utilisateur est associer a un autre utilisateur comme superviseur ",
			erreur: error,
		});
	}
};
exports.GetOneUtilisateur = async (req, res) => {
	try {
		utilisateur = await Utilisateur.findByPk(req.params.id); // autre Méthode
		// n = await Produit.upsert(req.body)
		if (utilisateur != null) {
			res.status(200).json({
				Status: "Succes",
				utilisateur: utilisateur,
			});
		} else {
			throw new Error("Utilisateur not Found");
		}
	} catch (error) {
		res.status(400).json({
			Status: "Utilisateur Not Found",
			erreur: error,
		});
	}
};
