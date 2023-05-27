const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const EtiquetteImprimees = sequelize.define("EtiquetteImprimees", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

	refProd: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	nbrCopie: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	serialNumber: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	numOF: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	userMatricule: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	state: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	withDataMatrix: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},

	action: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	motifReimpression: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	formatLot: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	filePath: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	dataMatrixData: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});
try {
	EtiquetteImprimees.sync({ alter: true }).then(() => {
		console.log(
			"\x1b[32m",
			"EtiquetteImprimees Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("EtiquetteImprimees Model synchronized Failed.");
}

module.exports = EtiquetteImprimees;
