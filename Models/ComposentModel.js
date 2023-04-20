const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const Composent = sequelize.define("Composent", {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	refEtiquette: {
		type: DataTypes.STRING,
		allowNull: true,
		references: {
			model: "Etiquette",
			key: "id",
		},
		onDelete: "CASCADE",
	},
	type: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	refItem: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	largeur: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	longeur: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	format: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "rectangle",
	},
	color: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "white",
	},
	backgroundColor: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "white",
	},
	BorderType: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "none",
	},
	border: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "none",
		// "taille type color raduis"
	},
	padding: {
		type: DataTypes.FLOAT,
		allowNull: true,
		defaultValue: 5.0,
	},
	posX: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 2.0,
	},
	posY: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 2.0,
	},
	fontFamily: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "Time new roman",
	},
	fontWeight: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "none",
	},
	fontSize: {
		type: DataTypes.FLOAT,
		allowNull: true,
		defaultValue: 12.0,
	},
	textSpacing: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	underLine: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false,
	},
	italic: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false,
	},

	Capitale: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false,
	},
	align: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "center",
	},
	orientation: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "0",
	},
	data: {
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
	Composent.sync({ force: true }).then(() => {
		console.log(
			"\x1b[32m",
			"Composent Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("Composent Model synchronized Failed.");
}

module.exports = Composent;
