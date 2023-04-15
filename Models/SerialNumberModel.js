const { DataTypes } = require('sequelize');
const sequelize = require("../ConnexionDB")
const SerialNumber = sequelize.define("SerialNumber", {
  idSN: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  suffix: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prefix: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nbrCaractere: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  typeCompteur: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  pas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  format: {
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
}
);
try {
  SerialNumber.sync().then(() => {console.log("\x1b[32m","SerialNumber Model synchronized successfully.","\x1b[0m")})
} catch (err) {
  console.log("SerialNumber Model synchronized Failed.");
}
module.exports = SerialNumber



