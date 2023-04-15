const { DataTypes } = require('sequelize');
const sequelize = require("../ConnexionDB")
const bcrypt = require('bcryptjs')
// Utlisateurs Model
const Utilisateurs = sequelize.define("Utilisateurs", {
  Matricule: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true,
    validate: {
      len : 4 // length = 4 
    }
  },
  Nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len : [3,35]
    }
  },
  Prenom: {
    type: DataTypes.STRING,
    allowNull: false,
     validate: {
      len : [3,35]
    }
  },
  Roles: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn:[["ADMIN","INFO","Directeur","Responsable UAP","Agent Méthode","Agent de Saisie"]]
    }
  },
  AtelierLiecod: {
    type: DataTypes.STRING,
     allowNull: false,
     references: {
       model: "Atelier",
       key : "Liecod",
    }
  },
   MotDePasseChangedAt: {
    type: DataTypes.VIRTUAL,
     allowNull: true,
  },
  MotDePasse: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "12345",
    

    //TODO : rendre le fonction de hash asynchrone pour eviter le blockage de event Loop 
    set(value) {  
      this.setDataValue("MotDePasse", bcrypt.hashSync(value, 12));
    }
  },
 
  Statut: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  NomPC : {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is : /^(ASOUSD|ASOUSL)[a-zA-Z0-9]{4}/
    }
  },
  Créateur: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is : /^[0-9]{4}$/
    },
    references: {
      model: 'Utilisateurs',
      key : 'Matricule',
    },
    onDelete: "SET NULL"
  },
  Modificateur: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Utilisateurs',
      key : 'Matricule',
    },
     validate: {
      is : /^[0-9]{4}$/
    },
  },
  SuperUser: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Utilisateurs',
      key : 'Matricule',
    },
  }
}, { timestamps: true });
// if (Utilisateurs.afterUpdate("MotDePasse", () => {
//   Utilisateurs.setDataValue("MotDePasseChangedAt", new Date().getTime())
// }))
try{Utilisateurs.sync().then(() => {
  console.log("\x1b[32m","Utilisateurs Model synchronized successfully.","\x1b[0m");
})
} catch (err) {
  console.log("Utilisateurs Model synchronized Failed.");
}
module.exports = Utilisateurs