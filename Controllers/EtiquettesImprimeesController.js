const EtiquetteImprimees = require("../Models/EtiquettesImprimeesModel");
const sequelize = require("../ConnexionDB");
const { Op } = require("sequelize");
exports.CreateEtiquetteImprimee = async (req, res) => {
	try {
		const etiquetteImprimee = await EtiquetteImprimees.create(req.body);
		res.status(201).json({
			Status: "Etiquette Imprimee created Successfully",
			etiquetteImprimee,
		});
	} catch (err) {
		res.status(400).json({
			Status: "Failed EtiquetteImprimees Creation",
			erreur: err,
		});
	}
};
exports.GetAllEtiquettesImprimees = async (req, res) => {
	try {
		console.log(req.query.month);
		//--------------------------------------- by OF Num ---------------------------------
		if (req.query.numOF) {
			const etiquettesImprimees = await EtiquetteImprimees.findAll({
				attributes: [
					"numOF",
					"serialNumber",
					"refProd",
					"formatLot",
					"dataMatrixData",
				],
				where: { numOF: req.query.numOF },
				group: [
					"numOF",
					"serialNumber",
					"refProd",
					"formatLot",
					"dataMatrixData",
				],
			});
			res.status(200).json({
				Status: "Succes",
				etiquettesImprimees,
			});
			//----------------------------------------------- BY YEAR & Month ----------------
		} else if (
			req.query.count !== undefined &&
			req.query.action !== undefined &&
			req.query.SN !== undefined
		) {
			const etiquettesImprimees = await EtiquetteImprimees.findAll({
				attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]],
				where: {
					[Op.and]: [
						{ action: req.query.action, serialNumber: { [Op.ne]: null } },
					],
				},
			});
			res.status(200).json({
				Status: "Succes",
				etiquettesImprimees,
			});
		}
		///------------------------------------------------------------------------------------
		else if (req.query.count !== undefined && req.query.action !== undefined) {
			const etiquettesImprimees = await EtiquetteImprimees.findAll({
				attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]],
				where: {
					[Op.and]: [{ action: req.query.action }],
				},
			});
			res.status(200).json({
				Status: "Succes",
				etiquettesImprimees,
			});
		}
		///---------------------------------------------------------------------------
		else if (req.query.count !== undefined) {
			const etiquettesImprimees = await EtiquetteImprimees.findAll({
				attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]],
			});
			res.status(200).json({
				Status: "Succes",
				etiquettesImprimees,
			});
		}
		//-------------------------------------------------------------------------------------
		else if (
			// req.query.day &&
			req.query.month !== undefined &&
			req.query.year &&
			req.query.action
		) {
			console.log("month");
			const etiquettesImprimees = await EtiquetteImprimees.findAll(
				{
					attributes: [
						[sequelize.fn("COUNT", sequelize.col("id")), "total"],
						[sequelize.fn("MONTH", sequelize.col("date")), "month"],
					],
					where: {
						[Op.and]: [
							sequelize.where(
								sequelize.fn("YEAR", sequelize.col("date")),
								req.query.year
							),
							// sequelize.where(
							// 	sequelize.fn("MONTH", sequelize.col("date")),
							// 	req.query.month
							// ),
							// sequelize.where(
							// 	sequelize.fn("DAY", sequelize.col("date")),
							// 	req.query.day
							// ),
							{ action: req.query.action, serialNumber: { [Op.ne]: null } },
						],
					},
					group: [[sequelize.fn("MONTH", sequelize.col("date")), "month"]],
				}
				// [[sequelize.fn("MONTH", sequelize.col("created_at")), "month"]],
				// { include: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]] },
			);
			res.status(200).json({
				Status: "Succes",
				etiquettesImprimees,
			});
			//--------------------------------------------------- All -------------------------------------------
		} else if (
			req.query.day !== undefined &&
			req.query.year &&
			req.query.action
		) {
			console.log("day");
			console.log(req.query.day);
			const etiquettesImprimees = await EtiquetteImprimees.findAll(
				{
					attributes: [
						[sequelize.fn("COUNT", sequelize.col("id")), "total"],
						[sequelize.fn("DAY", sequelize.col("date")), "day"],
						[sequelize.fn("MONTH", sequelize.col("date")), "month"],
					],
					where: {
						[Op.and]: [
							sequelize.where(
								sequelize.fn("YEAR", sequelize.col("date")),
								req.query.year
							),
							// sequelize.where(
							// 	sequelize.fn("MONTH", sequelize.col("date")),
							// 	req.query.month
							// ),
							// sequelize.where(
							// 	sequelize.fn("DAY", sequelize.col("date")),
							// 	req.query.day
							// ),
							{ action: req.query.action, serialNumber: { [Op.ne]: null } },
						],
					},
					group: [
						[sequelize.fn("DAY", sequelize.col("date")), "day"],
						[sequelize.fn("MONTH", sequelize.col("date")), "month"],
					],
				}
				// [[sequelize.fn("MONTH", sequelize.col("created_at")), "month"]],
				// { include: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]] },
			);
			res.status(200).json({
				Status: "Succes",
				etiquettesImprimees,
			});
			//--------------------------------------------------- All -------------------------------------------
		} else if (req.query.month && req.query.year) {
			console.log(req.query.month + req.query.year);
			const etiquettesImprimees = await EtiquetteImprimees.findAll(
				{
					attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]],
					where: {
						[Op.and]: [
							sequelize.where(
								sequelize.fn("YEAR", sequelize.col("date")),
								req.query.year
							),
							sequelize.where(
								sequelize.fn("MONTH", sequelize.col("date")),
								req.query.month
							),
						],
					},
				}
				// [[sequelize.fn("MONTH", sequelize.col("created_at")), "month"]],
				// { include: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]] },
			);
			res.status(200).json({
				Status: "Succes",
				etiquettesImprimees,
			});
			//--------------------------------------------------- All -------------------------------------------
		} else {
			const etiquettesImprimees = await EtiquetteImprimees.findAll();
			res.status(200).json({
				Status: "Succes",
				etiquettesImprimees,
			});
		}
	} catch (error) {
		res.status(400).json({
			Status: "EtiquetteImprimees Not Found",
			erreur: error,
		});
	}
};
exports.UpdateEtiquetteImprimee = async (req, res) => {
	try {
		n = await EtiquetteImprimees.update(req.body, {
			where: { id: req.params.id },
			returning: true,
		});
		if (n[0] >= 1) {
			res.status(200).json({
				Status: "EtiquetteImprimees Updated Successfully",
				numberOfAffectedRows: n[0],
				etiquetteImprimee: n[1],
			});
		} else {
			res.status(304).json({
				Status: "EtiquetteImprimees Not Found",
			});
		}
	} catch (err) {
		res.status(400).json({
			Status: " EtiquetteImprimees Updated Failed",
			erreur: err,
		});
	}
};
exports.DeleteEtiquetteImprimee = async (req, res) => {
	try {
		n = await EtiquetteImprimees.destroy({ where: { id: req.params.id } }); // autre Méthode
		if (n >= 1) {
			res.status(200).json({
				Status: "EtiquetteImprimees Deleted Successfully",
				"number of affected rows": n,
			});
		} else {
			res.status(304).json({
				Status: "EtiquetteImprimees Not Found",
			});
		}
	} catch (error) {
		res.status(400).json({
			Status: "EtiquetteImprimees Delete Failed",
			erreur: error,
		});
	}
};
exports.GetOneEtiquetteImprimee = async (req, res) => {
	try {
		etiquetteImprimee = await EtiquetteImprimees.findByPk(req.params.id); // autre Méthode
		// n = await Produit.upsert(req.body)
		if (etiquetteImprimee != null) {
			res.status(200).json({
				Status: "Succes",
				etiquetteImprimee,
			});
		} else {
			throw new Error("EtiquetteImprimees not Found");
		}
	} catch (error) {
		res.status(400).json({
			Status: "EtiquetteImprimees Not Found",
			erreur: error,
		});
	}
};
exports.GetPrintDetail = async (req, res) => {
	try {
		const [results, metadata] = await sequelize.query(`
			select   t1.[refProd]
				,t1.[serialNumber]
				,t1.[numOF]
				,t1.[withDataMatrix]
				,t1.[formatLot]
				,t1.[filePath]
				,t1.nbrCopie
				,t1.dateImpr
				,t1.dateReimpr,
				t2.imprUserMatricule,
				t3.reImprUserMatricule  
				from
			(SELECT
				[refProd]
				,[serialNumber]
				,[numOF]
				,[withDataMatrix]
				,[formatLot]
				,[filePath],
				SUM([nbrCopie]) as nbrCopie,
				MAX([date]) as dateImpr,
				MIN([date]) as dateReimpr
			FROM [Gestion Etiquette].[dbo].[EtiquetteImprimees]
			GROUP BY [refProd]
				,[serialNumber]
				,[numOF]
				,[withDataMatrix]
				,[formatLot]
				,[filePath]
			) t1
			Inner join (
				SELECT
				[serialNumber]
				,[numOF]
				,[date] 
				,[userMatricule] as imprUserMatricule
				FROM [Gestion Etiquette].[dbo].[EtiquetteImprimees]) t2 
			ON  t1.numOF = t2.numOF and t1.serialNumber = t2.serialNumber and t1.dateImpr = t2.date
			Inner join (
				SELECT
				[serialNumber]
				,[numOF]
				,[date] 
				,[userMatricule] as reImprUserMatricule
				FROM [Gestion Etiquette].[dbo].[EtiquetteImprimees]) t3 
			ON  t1.numOF = t2.numOF and t1.serialNumber = t2.serialNumber and t1.dateReimpr = t3.date`);

		res.status(200).json({
			Status: "Succes",
			printDetail: results,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			Status: "PrintDetail Data Not Found",
			erreur: error,
		});
	}
};
// exports.GetAllEtiquettesReImprimees = async (req, res) => {
// 	try {

// 	} catch (error) {
// 		res.status(400).json({
// 			Status: "EtiquetteImprimees Not Found",
// 			erreur: error,
// 		});
// 	}
// };
