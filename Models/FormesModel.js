const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const Formes = sequelize.define("Formes", {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
	},
	path: {
		type: DataTypes.TEXT,
	},
	clicked: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});
try {
	Formes.sync().then(() => {
		console.log(
			"\x1b[32m",
			"Formes Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("Formes Model synchronized Failed.");
}

module.exports = Formes;
