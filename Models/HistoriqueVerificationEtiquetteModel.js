const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const HistoriqueVerificationEtiquette = sequelize.define(
	"HistoriqueVerificationEtiquette",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		problemId: {
			type: DataTypes.INTEGER,
			references: {
				model: "ProblemModel",
				key: "id",
			},
		},
		dataMatrixData: {
			type: DataTypes.TEXT,
		},
		userMatricule: {
			type: DataTypes.STRING,
			references: {
				model: "Utilisateurs",
				key: "matricule",
			},
			onDelete: "SET NULL",
		},
	}
);
try {
	HistoriqueVerificationEtiquette.sync().then(() => {
		console.log(
			"\x1b[32m",
			"HistoriqueVerificationEtiquette Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("HistoriqueVerificationEtiquette Model synchronized Failed.");
}

module.exports = HistoriqueVerificationEtiquette;
