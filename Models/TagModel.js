const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const Tag = sequelize.define("Tag", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	tag: {
		type: DataTypes.STRING,
		unique: true,
	},
});
try {
	Tag.sync().then(() => {
		console.log("\x1b[32m", "Tag Model synchronized successfully.", "\x1b[0m");
	});
} catch (err) {
	console.log("Tag Model synchronized Failed.");
}

module.exports = Tag;
