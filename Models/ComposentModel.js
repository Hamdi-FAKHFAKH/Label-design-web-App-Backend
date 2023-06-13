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
	x: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	y: {
		type: DataTypes.STRING,
		allowNull: true,
	},

	ordre: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	format: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	children: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	dataMatrixFormat: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	dataMatrixCode: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	height: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	width: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	color: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "#000000",
	},
	"background-color": {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "##FF000000",
	},
	"border-style": {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "none",
	},
	"border-color": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"border-width": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	padding: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"padding-top": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"padding-bottom": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"padding-right": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"padding-left": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"font-style": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"text-decoration": {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "none",
	},
	margin: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: 0,
	},
	"margin-left": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"margin-bottom": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"margin-top": {
		type: DataTypes.STRING,
		allowNull: true,
	},
	"margin-right": {
		type: DataTypes.STRING,
		allowNull: true,
	},

	"font-family": {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "Time new roman",
	},
	"font-size": {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: 15.0,
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
	bold: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false,
	},
	"text-align": {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "left",
	},
	transform: {
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
	Composent.sync().then(() => {
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
