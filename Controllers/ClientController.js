const Client = require("../Models/ClientModel");
exports.CreateClient = async (req,res) => {
try {
    const client = await Client.create(req.body)
    res.status(201).json({
        Status: "Client créer avec Succées",
        client : client
    })
} catch (err) {
    res.status(400).json({
        Status: "Echec de création de client",
        erreur: err
    });
  }
}
exports.GetAllClients = async (req,res) => {
    try {
       const client = await Client.findAll()
        res.status(200).json({
            Status: "Succes",
            client: client
        });
    } catch (error) {
        res.status(400).json({
        Status: "Client n'existe pas",
        erreur: error
    });
    }
}
exports.UpdateClient = async (req, res) => {
   
     try {
        n = await Client.update(req.body, { where: { codeClient: req.params.id } , returning:true}); // autre Méthode 
        // n = await Produit.upsert(req.body) 
         n[0] >= 1 ?
            res.status(200).json({
            Status: "Client Modifié avec Succès",
            numberOfAffectedRows: n[0],
            ClientUpdated : n[1]
            }) :
            res.status(302).json({
            Status: "Client n'existe pas",
        });
    } catch (error) {
        res.status(400).json({
        Status: "Echec de Modification de Client",
        erreur: error
    });
    }
}
exports.DeleteClient =async (req, res) => {
   
     try {
        n = await Client.destroy({ where: { codeClient: req.params.id }}); // autre Méthode
        // n = await Produit.upsert(req.body) 
        n >= 1 ?
        res.status(200).json({
            Status: "client Supprimer avec Succés",
            "number of affected rows": n
        })     :
        res.status(302).json({
            Status: "Client n'existe pas",
        });
    } catch (error) {
        res.status(400).json({
            Status: "Echec de Suppression de Client",
        erreur: error
    });
    }
}
exports.GetOneClient = async (req, res) => {
   
     try {
        client = await Client.findByPk(req.params.id); // autre Méthode
        // n = await Produit.upsert(req.body) 
         console.log(client);
         if (client != null) {
             res.status(200).json({
            Status: "Succes",
            client : client
             });
         }
         else {
             throw new Error("Client n'existe pas")
         }
       
    } catch (error) {
        res.status(204).json({
        Status: "Client n'existe pas",
        erreur: error
    });
    }
}