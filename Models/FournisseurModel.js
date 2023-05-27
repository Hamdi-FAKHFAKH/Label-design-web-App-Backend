const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
Fournisseur = sequelize.define("Fournisseur", {
	codeFournisseur: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	desFournisseur: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	createur: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	modificateur: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});
try {
	Fournisseur.sync({ alert: true }).then(() => {
		console.log(
			"\x1b[32m",
			"Fournisseur Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("Fournisseur Model synchronized Failed.");
}

module.exports = Fournisseur;
