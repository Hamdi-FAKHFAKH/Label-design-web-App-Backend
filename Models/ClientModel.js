const { DataTypes } = require('sequelize');
const sequelize = require("../ConnexionDB")
const Client = sequelize.define('Client', {
    codeClient: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    desClient: {
    type: DataTypes.STRING,
    allowNull : true
    },
    createur: {
    type: DataTypes.STRING,
    allowNull : true
    },
    modificateur: {
    type: DataTypes.STRING,
    allowNull : true
  },    
});
try{Client.sync({alter:true}).then(() => {
  console.log("\x1b[32m","Client Model synchronized successfully.","\x1b[0m");
})
} catch (err) {
  console.log("Client Model synchronized Failed.");
}

module.exports = Client