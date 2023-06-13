const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const ProblemModel = sequelize.define("ProblemModel", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	msg: {
		type: DataTypes.STRING,
		unique: true,
	},
});
try {
	ProblemModel.sync().then(() => {
		console.log(
			"\x1b[32m",
			"ProblemModel Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("ProblemModel Model synchronized Failed.");
}

module.exports = ProblemModel;
