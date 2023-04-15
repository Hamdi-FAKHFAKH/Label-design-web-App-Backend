const SerialNumber = require("../Models/SerialNumberModel");
exports.CreateSerialNumber = async (req,res) => {
try {
    const serialNumber = await SerialNumber.create(req.body)
    res.status(201).json({
        Status: "SerialNumber Created Successfully",
        serialNumber : serialNumber
    })
} catch (err) {
    res.status(400).json({
        Status: "Failed SerialNumber Creation",
        erreur: err
    });
  }
}
exports.GetAllSerialNumber = async (req,res) => {
    try {
       const serialNumber = await SerialNumber.findAll()
        res.status(200).json({
            Status: "Succes",
            serialNumber
        });
    } catch (error) {
        res.status(400).json({
        Status: "SerialNumber Not Found",
        erreur: error
    });
    }
}
exports.UpdateSerialNumber = async (req, res) => {
   
     try {
        n = await SerialNumber.update(req.body, { where: { idSN: req.params.id } , returning:true}); // autre Méthode 
        // n = await Produit.upsert(req.body) 
         n[0] >= 1 ?
            res.status(200).json({
            Status: "SerialNumber Updated Successfully",
            "number of affected rows": n[0],
            UtilisateurUpdated : n[1]
            }) :
            res.status(302).json({
            Status: "SerialNumber Not Found",
        });
    } catch (error) {
        res.status(400).json({
        Status: "SerialNumber Update Failed ",
        erreur: error
    });
    }
}
exports.DeleteSerialNumber =async (req, res) => {
   
     try {
        n = await SerialNumber.destroy({ where: { idSN: req.params.id }}); // autre Méthode
        // n = await Produit.upsert(req.body) 
        n >= 1 ?
        res.status(200).json({
            Status: "SerialNumber Deleted Successfully",
            "number of affected rows": n
        })     :
        res.status(302).json({
            Status: "SerialNumber Not Found",
        });
    } catch (error) {
        res.status(400).json({
            Status: "SerialNumber Deleted Failed",
            msg : "SerialNumber est associer a un autre SerialNumber comme superviseur ",
        erreur: error
    });
    }
}
exports.GetOneSerialNumber= async (req, res) => {
   
     try {
        serialNumber = await SerialNumber.findByPk(req.params.id); // autre Méthode
        // n = await Produit.upsert(req.body) 
         if (serialNumber != null) {
             res.status(200).json({
            Status: "Succes",
            serialNumber
             });
         }
         else {
             throw new Error("SerialNumber not Found")
         }
       
    } catch (error) {
        res.status(400).json({
        Status: "SerialNumber Not Found",
        erreur: error
    });
    }
}