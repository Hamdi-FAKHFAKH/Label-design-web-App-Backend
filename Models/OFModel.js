const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const OF = sequelize.define("OF", {
	ofnum: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	proref: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	liecod: {
		type: DataTypes.STRING,
		allowNull: true,
		references: {
			model: "Atelier",
			key: "Liecod",
		},
		onDelete: "SET NULL",
	},
});
try {
	OF.sync().then(() => {
		console.log("\x1b[32m", "OF Model synchronized successfully.", "\x1b[0m");
	});
} catch (err) {
	console.log("OF Model synchronized Failed.");
}

module.exports = OF;
