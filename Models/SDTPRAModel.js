const { DataTypes } = require('sequelize');
const sequelize = require("../ConnexionDB")
const SDTPRA = sequelize.define("SDTPRA", {
  ProRef: {
    type: DataTypes.STRING,
    primaryKey : true
    },
  ProtypCod: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "LienProTypeAtelier",
      key : "ProtypCod"
    }
  },
  prodes1: {
    type: DataTypes.STRING,
    unique : true   
  },
  prodes2: {
    type: DataTypes.STRING,
    unique : true   
  },
});
try{SDTPRA.sync().then(() => {
  console.log("\x1b[32m","SDTPRA Model synchronized successfully.","\x1b[0m");
})
} catch (err) {
  console.log("SDTPRA Model synchronized Failed.");
}
module.exports = SDTPRA