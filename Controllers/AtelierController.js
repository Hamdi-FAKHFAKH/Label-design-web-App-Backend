const Atelier = require("../Models/AtelierModel")
exports.CreateAtelier = async (req, res) => {
try{
    const atelier = await Atelier.create(req.body);
    res.status(201).json({
        Status: "Atelier created Successfully",
        Atelier: atelier
        });
} catch (err) {
    res.status(400).json({
        Status: "Failed Atelier Creation",
        erreur: err
    });
  }
}
exports.GetAllAtelier = async (req,res) => {
    try {
        const atelier = await Atelier.findAll();
        res.status(302).json({
            Status: "Succes",
            Atelier: atelier
        });
    } catch (error) {
        res.status(400).json({
        Status: "Atelier Not Found",
        erreur: error
    });
    }
}
exports.UpdateAtelier = async (req, res) => {
try{
    n = await Atelier.update(req.body, { where: { Liecod: req.params.id }, returning: true });
    if (n >= 1) {
        res.status(301).json({
            Status: "Atelier Updated Successfully",
            "number of affected rows": n[0],
            Atelier: n[1]
        });
    } else {
        res.status(304).json({
            Status: "Atelier Not Found"
        });
    }
} catch (err) {
    res.status(400).json({
        Status: " Atelier Updated Failed",
        erreur: err
    });
  }
}
exports.DeleteAtelier =async (req, res) => {
   
     try {
        n = await Atelier.destroy({ where: { Liecod: req.params.id }}); // autre Méthode 
        // n = await Produit.upsert(req.body) 
         if (n >= 1) {
            res.status(200).json({
            Status: "Atelier Deleted Successfully",
            "number of affected rows": n
        });
        } else {
            res.status(304).json({
                Status : "Atelier Not Found"
            })
        }
    } catch (error) {
        res.status(400).json({
        Status: "Atelier Delete Failed",
        erreur: error
    });
    }
}
exports.GetOneAtelier = async (req, res) => {
   
     try {
        atelier = await Atelier.findByPk(req.params.id); // autre Méthode
        // n = await Produit.upsert(req.body) 
         if (atelier != null) {
             res.status(200).json({
            Status: "Succes",
            Atelier : atelier
             });
         }
         else {
             throw new Error("Atelier not Found")
         }
       
    } catch (error) {
        res.status(400).json({
        Status: "Atelier Not Found",
        erreur: error
    });
    }
}