const { DataTypes } = require("sequelize");
const sequelize = require("../ConnexionDB");
const bcrypt = require("bcryptjs");
// Utlisateurs Model
const Utilisateurs = sequelize.define(
	"Utilisateurs",
	{
		statut: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		matricule: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true,
			validate: {
				len: 4, // length = 4
			},
		},
		nom: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 35],
			},
		},
		prenom: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 35],
			},
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		atelierLiecod: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: "Atelier",
				key: "Liecod",
			},
		},
		UAP: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nomPC: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		motDePasseChangedAt: {
			type: DataTypes.VIRTUAL,
			allowNull: true,
		},
		motDePasse: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "12345",
			//TODO : rendre le fonction de hash asynchrone pour eviter le blockage de event Loop
			set(value) {
				this.setDataValue("motDePasse", bcrypt.hashSync(value, 12));
			},
		},
		créateur: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: "Utilisateurs",
				key: "matricule",
			},
			onDelete: "SET NULL",
		},
		modificateur: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: "Utilisateurs",
				key: "matricule",
			},
			onDelete: "SET NULL",
		},
		imgData: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{ timestamps: true }
);
// if (Utilisateurs.afterUpdate("MotDePasse", () => {
//   Utilisateurs.setDataValue("MotDePasseChangedAt", new Date().getTime())
// }))
try {
	Utilisateurs.sync().then(() => {
		console.log(
			"\x1b[32m",
			"Utilisateurs Model synchronized successfully.",
			"\x1b[0m"
		);
	});
} catch (err) {
	console.log("Utilisateurs Model synchronized Failed.");
}
module.exports = Utilisateurs;
