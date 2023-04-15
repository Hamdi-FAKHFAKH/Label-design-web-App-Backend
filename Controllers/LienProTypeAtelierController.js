const LienProTypeAtelier = require("../Models/LienProTypeAtelierModel")
exports.CreateLienAtelierUAP = async (req, res) => {
try{
    const lienProTypeAtelier = await LienProTypeAtelier.create(req.body);
    res.status(201).json({
        Status: "Succes",
        lienProTypeAtelier
        });
} catch (err) {
    res.status(400).json({
        Status: "Failed LienProTypeAtelier Creation",
        erreur: err
    });
  }
}
exports.GetAllLienAtelierUAP = async (req,res) => {
    try {
        const lienProTypeAtelier = await LienProTypeAtelier.findAll();
        res.status(302).json({
            Status: "Succes",
          lienProTypeAtelier
        });
    } catch (error) {
        res.status(400).json({
        Status: "LienProTypeAtelier Not Found",
        erreur: error
    });
    }
}
exports.UpdateLienAtelierUAP = async (req, res) => {
try{
    n = await LienProTypeAtelier.update(req.body,{ where: { ProtypCod: req.params.id } , returning:true});
     res.status(301).json({
            Status: "Succes",
            "number of affected rows": n[0],
            LienProTypeAtelier : n[1]
        });
} catch (err) {
    res.status(400).json({
        Status: " LienProTypeAtelier Update Failed",
        erreur: err
    });
  }
}
exports.DeleteLienAtelierUAP =async (req, res) => {
   
     try {
        n = await LienProTypeAtelier.destroy({ where: { ProtypCod: req.params.id }}); // autre Méthode 
        // n = await Produit.upsert(req.body) 
        res.status(200).json({
            Status: "Succes",
            "number of affected rows": n
        });
    } catch (error) {
        res.status(400).json({
        Status: "lienProTypeAtelier Delete Failed",
        erreur: error
    });
    }
}
exports.GetOneLienAtelierUAP = async (req, res) => {
   
     try {
        lienProTypeAtelier = await LienProTypeAtelier.findByPk(req.params.id); // autre Méthode
        // n = await Produit.upsert(req.body) 
         if (lienProTypeAtelier != null) {
             res.status(200).json({
            Status: "Succes",
           lienProTypeAtelier
             });
         }
         else {
             throw new Error("lienProTypeAtelier not Found")
         }
       
    } catch (error) {
        res.status(400).json({
        Status: "lienProTypeAtelier Not Found",
        erreur: error
    });
    }
}