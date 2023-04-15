const { DataTypes } = require('sequelize');
const sequelize = require("../ConnexionDB")
// LienProTypeAtelier Model
LienProTypeAtelier = sequelize.define('LienProTypeAtelier', {
  ProtypCod: {
    type: DataTypes.STRING,
    primaryKey: true,
   
  },
  Libelle: {
    type: DataTypes.STRING,
    allowNull : true
  },
  Liecod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
try{LienProTypeAtelier.sync({ alter: true }).then(() => {
  console.log("\x1b[32m","LienProTypeAtelier Model synchronized successfully.","\x1b[0m");
})
} catch (err) {
  console.log("LienProTypeAtelier Model synchronized Failed.");
}

module.exports = LienProTypeAtelier