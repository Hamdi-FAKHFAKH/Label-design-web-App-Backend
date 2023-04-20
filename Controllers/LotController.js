const Lot = require("../Models/LotModel");
exports.CreateLot = async (req,res) => {
try {
    const lot = await Lot.create(req.body)
    res.status(201).json({
        Status: "Lot créer avec Succées",
        lot : lot
    })
} catch (err) {
    res.status(400).json({
        Status: "Echec de création de Lot",
        erreur: err
    });
  }
}
exports.GetAllLots = async (req,res) => {
    try {
       const lots = await Lot.findAll()
        res.status(200).json({
            Status: "Succes",
            lots
        });
    } catch (error) {
        res.status(400).json({
        Status: "Lot n'existe pas",
        erreur: error
    });
    }
}
exports.UpdateLot = async (req, res) => {
     try {
        n = await Lot.update(req.body, { where: { numLot: req.params.id } , returning:true}); // autre Méthode 
        // n = await Produit.upsert(req.body) 
         n[0] >= 1 ?
            res.status(200).json({
            Status: "Lot Modifié avec Succès",
            "numberOfAffectedRows": n[0],
            LotUpdated : n[1]
            }) :
            res.status(302).json({
            Status: "Lot n'existe pas",
        });
    } catch (error) {
        res.status(400).json({
        Status: "Echec de Modification de Lot",
        erreur: error
    });
    }
}
exports.DeleteLot =async (req, res) => {
   
     try {
        n = await Lot.destroy({ where: { numLot: req.params.id }}); // autre Méthode
        n >= 1 ?
        res.status(200).json({
            Status: "Lot Supprimer avec Succés",
            "number of affected rows": n
        })     :
        res.status(302).json({
            Status: "Lot n'existe pas",
        });
    } catch (error) {
        res.status(400).json({
            Status: "Echec de Suppression de Lot",
        erreur: error
    });
    }
}
exports.GetOneLot= async (req, res) => {
   
     try {
        lot = await Lot.findByPk(req.params.id); // autre Méthode
        // n = await Produit.upsert(req.body) 
         if (lot != null) {
             res.status(200).json({
            Status: "Succes",
            lot
             });
         }
         else {
             throw new Error("Lot n'existe pas")
         }
       
    } catch (error) {
        res.status(400).json({
        Status: "Lot n'existe pas",
        erreur: error
    });
    }
}
exports.FindByFormat = async (req, res) => {
      try {
       const lot = await Lot.findOne({ where: { format: req.body.format }})
        res.status(200).json({
            Status: true,
            lot
        });
    } catch (error) {
        res.status(400).json({
        Status: "Lot n'existe pas",
        erreur: error
    });
    }
}