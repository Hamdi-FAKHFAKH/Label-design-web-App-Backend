const SDTPRA = require("../Models/SDTPRAModel");
exports.CreateSDTPRA = async (req, res) => {
	try {
		const S = await SDTPRA.create(req.body);
		res.status(201).json({
			Status: "Succes",
			SDTPRA: S,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Failed SDTPRA Creation",
			erreur: err,
		});
	}
};
exports.GetAllSDTPRA = async (req, res) => {
	try {
		if (req.query.protypCod) {
			const S = await SDTPRA.findAll({
				where: {
					protypCod: req.query.protypCod,
				},
			});
			res.status(200).json({
				Status: "Succes",
				SDTPRA: S,
			});
		}
		const S = await SDTPRA.findAll();
		res.status(200).json({
			Status: "Succes",
			SDTPRA: S,
		});
	} catch (error) {
		res.status(400).json({
			Status: "SDTPRA Not Found",
			erreur: error,
		});
	}
};
exports.UpdateSDTPRA = async (req, res) => {
	try {
		n = await SDTPRA.update(req.body, {
			where: { ProRef: req.params.id },
			returning: true,
		}); // autre Méthode
		// n = await Produit.upsert(req.body)
		res.status(200).json({
			Status: "SDTPRA Update Succes",
			"number of affected rows": n[0],
			UtilisateurUpdated: n[1],
		});
	} catch (error) {
		res.status(400).json({
			Status: "SDTPRA Update Failed ",
			erreur: error,
		});
	}
};
exports.DeleteSDTPRA = async (req, res) => {
	try {
		n = await SDTPRA.destroy({ where: { ProRef: req.params.id } }); // autre Méthode
		// n = await Produit.upsert(req.body)
		res.status(200).json({
			Status: "SDTPRA Delete Succes",
			"number of affected rows": n,
		});
	} catch (error) {
		res.status(400).json({
			Status: "SDTPRA Delete Failed",
			erreur: error,
		});
	}
};
exports.GetOneSDTPRA = async (req, res) => {
	try {
		S = await SDTPRA.findByPk(req.params.id); // autre Méthode
		// n = await Produit.upsert(req.body)
		if (SDTPRA != null) {
			res.status(200).json({
				Status: "Succes",
				SDTPRA: S,
			});
		} else {
			throw new Error("SDTPRA not Found");
		}
	} catch (error) {
		res.status(400).json({
			Status: "SDTPRA Not Found",
			erreur: error,
		});
	}
};
