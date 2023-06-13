const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
// LienProTypeAtelier Model
Atelier = sequelize.define("Atelier", {
	Liecod: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	Libelle_Atelier: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	Unite_Production: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
try {
	Atelier.sync({ alert: true }).then(() => {
		console.log(
			"\x1b[32m",
			"Atelier Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("Atelier Model synchronized Failed.");
}

module.exports = Atelier;
