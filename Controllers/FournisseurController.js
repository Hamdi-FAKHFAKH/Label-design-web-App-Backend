const Fournisseur = require("../Models/FournisseurModel");
exports.CreateFournisseur = async (req,res) => {
try {
    const fournisseur = await Fournisseur.create(req.body)
    res.status(201).json({
        Status: "Fournisseur créer avec Succées",
        fournisseur : fournisseur
    })
} catch (err) {
    res.status(400).json({
        Status: "Echec de création de Fournisseur",
        erreur: err
    });
  }
}
exports.GetAllFournisseur = async (req,res) => {
    try {
       const fournisseur = await Fournisseur.findAll()
        res.status(200).json({
            Status: "Succes",
            fournisseurs: fournisseur
        });
    } catch (error) {
        res.status(400).json({
        Status: "Fournisseur n'existe pas",
        erreur: error
    });
    }
}
exports.UpdateFournisseur = async (req, res) => {
   
     try {
        n = await Fournisseur.update(req.body, { where: { codeFournisseur: req.params.id } , returning:true}); // autre Méthode 
        // n = await Produit.upsert(req.body) 
         n[0] >= 1 ?
            res.status(200).json({
            Status: "Fournisseur Modifié avec Succès",
            "numberOfAffectedRows": n[0],
            UtilisateurUpdated : n[1]
            }) :
            res.status(302).json({
            Status: "Fournisseur n'existe pas",
        });
    } catch (error) {
        res.status(400).json({
        Status: "Echec de Modification de Fournisseur",
        erreur: error
    });
    }
}
exports.DeleteFournisseur =async (req, res) => {
   
     try {
        n = await Fournisseur.destroy({ where: { codeFournisseur: req.params.id }}); // autre Méthode
        // n = await Produit.upsert(req.body) 
        n >= 1 ?
        res.status(200).json({
            Status: "Fournisseur Supprimer avec Succés",
            "number of affected rows": n
        })     :
        res.status(302).json({
            Status: "Utilisateur n'existe pas",
        });
    } catch (error) {
        res.status(400).json({
            Status: "Echec de Suppression de Fournisseur",
            msg : "utilisateur est associer a un autre utilisateur comme superviseur ",
        erreur: error
    });
    }
}
exports.GetOneFournisseur = async (req, res) => {
   
     try {
        fournisseur = await Fournisseur.findByPk(req.params.id); // autre Méthode
        // n = await Produit.upsert(req.body) 
         console.log(Fournisseur);
         if (fournisseur != null) {
             res.status(200).json({
            Status: "Succes",
            fournisseur : fournisseur
             });
         }
         else {
            res.status(204).json({
            Status: "Fournisseur Not Found",
             });
         }
       
    } catch (error) {
        res.status(400).json({
        Status: "Fournisseur n'existe pas",
        erreur: error
    });
    }
}