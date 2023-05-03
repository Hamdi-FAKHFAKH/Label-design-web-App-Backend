const Etiquette = require("../Models/EtiquetteModel");
exports.CreateEtiquette = async (req, res) => {
	try {
		const etiquette = await Etiquette.create(req.body);
		res.status(201).json({
			Status: "Etiquette created Successfully",
			etiquette,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Failed Etiquette Creation",
			erreur: err,
		});
	}
};
exports.GetAllEtiquettes = async (req, res) => {
	try {
		const etiquettes = await Etiquette.findAll();
		res.status(200).json({
			Status: "Succes",
			etiquettes,
		});
	} catch (error) {
		res.status(400).json({
			Status: "Etiquette Not Found",
			erreur: error,
		});
	}
};
exports.UpdateEtiquette = async (req, res) => {
	try {
		n = await Etiquette.update(req.body, {
			where: { id: req.params.id },
		});
		if (n >= 1) {
			res.status(200).json({
				Status: "Etiquette Updated Successfully",
				"number of affected rows": n[0],
				Etiquette: n[1],
			});
		} else {
			res.status(304).json({
				Status: "Etiquette Not Found",
			});
		}
	} catch (err) {
		res.status(400).json({
			Status: " Etiquette Updated Failed",
			erreur: err,
		});
	}
};
exports.DeleteEtiquette = async (req, res) => {
	try {
		n = await Etiquette.destroy({ where: { id: req.params.id } }); // autre Méthode
		// n = await Produit.upsert(req.body)
		if (n >= 1) {
			res.status(200).json({
				Status: "Etiquette Deleted Successfully",
				"number of affected rows": n,
			});
		} else {
			res.status(304).json({
				Status: "Etiquette Not Found",
			});
		}
	} catch (error) {
		res.status(400).json({
			Status: "Etiquette Delete Failed",
			erreur: error,
		});
	}
};
exports.GetOneEtiquette = async (req, res) => {
	try {
		etiquette = await Etiquette.findByPk(req.params.id); // autre Méthode
		// n = await Produit.upsert(req.body)
		if (etiquette != null) {
			res.status(200).json({
				Status: "Succes",
				etiquette,
			});
		} else {
			throw new Error("Etiquette not Found");
		}
	} catch (error) {
		res.status(400).json({
			Status: "Etiquette Not Found",
			erreur: error,
		});
	}
};
