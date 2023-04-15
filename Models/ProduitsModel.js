const { DataTypes } = require('sequelize');
const sequelize = require("../ConnexionDB")
// Produit Model 
const Produit = sequelize.define("Produits", {
  ref: {
    type: DataTypes.STRING,
    primaryKey: true,
       references: {
      model: 'SDTPRA',
         key: 'ProRef',
      
    },
  },
  nomProduit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ref1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ref2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numLot: {
    type: DataTypes.STRING,
    allowNull: true,
   references: {
      model: 'Lot',
      key : 'numLot',
    },
   onDelete:'SET NULL'
  },  
  codeFournisseur: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Fournisseur',
      key : 'codeFournisseur',
    },
    onDelete:'SET NULL'
  },
  codeClient: {
    type: DataTypes.STRING,
    allowNull: true,
      references: {
      model: 'Client',
      key : 'codeClient',
    },
   onDelete:'SET NULL'
  },
  idEtiquette: {
    type: DataTypes.STRING,
    allowNull: true,
       references: {
      model: 'Etiquette',
      key : 'id',
    },
    onDelete:'SET NULL'
  },
  idSN: {
    type: DataTypes.STRING,
    allowNull: true,
       references: {
      model: 'SerialNumber',
      key : 'idSN',
    },
    onDelete:'SET NULL'
  },
  formes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Createur: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Modificateur: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  withDataMatrix: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  withSN: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  withOF: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  text1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text4: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text5: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}
);
try {
  Produit.sync().then(() => {console.log("\x1b[32m","Produit Model synchronized successfully.","\x1b[0m")})
} catch (err) {
  console.log("Produit Model synchronized Failed.");
}
module.exports = Produit



