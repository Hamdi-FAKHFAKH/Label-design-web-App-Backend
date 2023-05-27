const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
Lot = sequelize.define("Lot", {
	numLot: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	format: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},
	desLot: {
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
	Lot.sync().then(() => {
		console.log("\x1b[32m", "Lot Model synchronized successfully.", "\x1b[0m");
	});
} catch (err) {
	console.log("Lot Model synchronized Failed.");
}

module.exports = Lot;
