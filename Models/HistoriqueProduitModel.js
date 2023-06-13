const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
HistoriqueProduit = sequelize.define("HistoriqueProduit", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	refProd: {
		type: DataTypes.STRING,
	},
	operation: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	motif: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	data: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	userMatricule: {
		type: DataTypes.STRING,
		allowNull: true,
		references: {
			model: "Utilisateurs",
			key: "matricule",
		},
		onDelete: "SET NULL",
	},
});
try {
	HistoriqueProduit.sync().then(() => {
		console.log(
			"\x1b[32m",
			"HistoriqueProduit Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("HistoriqueProduit Model synchronized Failed.");
}

module.exports = HistoriqueProduit;
