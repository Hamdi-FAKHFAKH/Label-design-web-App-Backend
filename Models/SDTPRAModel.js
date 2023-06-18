const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const SDTPRA = sequelize.define("SDTPRA", {
	proRef: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	protypCod: {
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: "LienProTypeAtelier",
			key: "ProtypCod",
		},
	},
	prodes1: {
		type: DataTypes.STRING,
	},
	prodes2: {
		type: DataTypes.STRING,
	},
});
try {
	SDTPRA.sync({ alter: true }).then(() => {
		console.log(
			"\x1b[32m",
			"SDTPRA Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("SDTPRA Model synchronized Failed.");
}
module.exports = SDTPRA;
