const sequelize = require("../ConnexionDB");
const Produit = require("../Models/ProduitsModel");
exports.CreateProduit = async (req,res) => {
try {
    const produit = await Produit.create(req.body)
    res.status(201).json({
        Status: "Succes",
        produit: produit
    })
} catch (err) {
    res.status(400).json({
        Status: "Failed Produit Creation",
        erreur: err
    });
  }
}
exports.GetAllProduits = async (req,res) => {
    try {
        const produits = await Produit.findAll();
        res.status(200).json({
            Status: "Succes",
            produits: produits
        });
    } catch (error) {
        res.status(400).json({
        Status: "Produit Not Found",
        erreur: error
    });
    }
}
exports.UpdateProduit = async (req, res) => {
   
     try {
        n = await Produit.update(req.body, { where: { ref: req.params.id } , returning:true}); // autre Méthode 
        // n = await Produit.upsert(req.body) 
        res.status(200).json({
            Status: "Succes",
            numberOfAffectedRows: n[0],
            ProduitUpdated : n[1]
        });
    } catch (error) {
        res.status(400).json({
        Status: "Produit Update Failed ",
        erreur: error
    });
    }
}
exports.DeleteProduit =async (req, res) => {
   
     try {
        n = await Produit.destroy({ where: { ref: req.params.id }}); // autre Méthode 
        // n = await Produit.upsert(req.body) 
        res.status(200).json({
            Status: "Succes",
            "number of affected rows": n
        });
    } catch (error) {
        res.status(400).json({
        Status: "Produit Delete Failed",
        erreur: error
    });
    }
}
exports.GetOneProduit = async (req, res) => {
   
     try {
        produit = await Produit.findByPk(req.params.id); // autre Méthode
        // n = await Produit.upsert(req.body) 
         if (produit != null) {
             res.status(200).json({
            Status: "Succes",
            produit : produit
             });
         }
         else {
             throw new Error("Produit not Found")
         }
       
    } catch (error) {
        res.status(400).json({
        Status: "Produit Not Found",
        erreur: error
    });
    }
}
exports.GetAllProduitsData = async (req,res) => {
    try {
        const [results, metadata] = await sequelize.query(`SELECT Client.codeClient, Client.desClient, 
                  Fournisseur.desFournisseur, Lot.format, Lot.desLot, Produits.*, SDTPRA.ProtypCod, SDTPRA.prodes1, 
                  SDTPRA.prodes2, SerialNumber.suffix, SerialNumber.prefix, SerialNumber.nbrCaractere, 
                  SerialNumber.typeCompteur, SerialNumber.pas
                  FROM     Produits LEFT JOIN
                  Client ON Client.codeClient = Produits.codeClient LEFT JOIN
                  Fournisseur ON Produits.codeFournisseur = Fournisseur.codeFournisseur LEFT JOIN
                  Lot ON Produits.numLot = Lot.numLot LEFT JOIN
                  SDTPRA ON Produits.ref = SDTPRA.ProRef LEFT JOIN
                  SerialNumber ON Produits.idSN = SerialNumber.idSN`)
        // const produits = await Produit.findAll({include:[{model:'Lot',attributes:['desLot'],where:{numLot:numLot}}]});
        res.status(200).json({
            Status: "Succes",
            produits: results
        });
    } catch (error) {
        res.status(400).json({
        Status: "Produit Data Not Found",
        erreur: error
    });
    }
}
