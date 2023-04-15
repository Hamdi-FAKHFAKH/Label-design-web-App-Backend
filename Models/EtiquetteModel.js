const { DataTypes } = require('sequelize');
const sequelize = require("../ConnexionDB")
const Etiquette = sequelize.define('Etiquette', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    longeur: {
    type: DataTypes.FLOAT,
    allowNull : false
    },
    largeur: {
    type: DataTypes.FLOAT,
    allowNull : false
    },
    format: {
    type: DataTypes.STRING,
        allowNull: false,
    defaultValue : "rectangle"
    },
    couleur: {
    type: DataTypes.STRING,
        allowNull: false,
    defaultValue : "white"
    },
    padding: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue : 5.0
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
try{Etiquette.sync().then(() => {
  console.log("\x1b[32m","Etiquette Model synchronized successfully.","\x1b[0m");
})
} catch (err) {
  console.log("Etiquette Model synchronized Failed.");
}

module.exports = Etiquette