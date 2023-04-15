const Utilisateur = require("../Models/UtilisateurModel");
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const bcrypt = require('bcryptjs');
const AppError = require("../Utils/AppError");
exports.SignIn = async (req, res, next) => { 
    const user = await Utilisateur.findOne({ where: { Matricule: req.body.Matricule } })
    if (!user) {
         next(new AppError("Login incorrect, veuillez vérifier le login saisi, sinon veuillez contacter votre supérieur pour vous accorder un accès", 400))
    }
    if (!(await bcrypt.compare(req.body.MotDePasse, user.MotDePasse))) {
        next(new AppError("Mot de passe incorrect, veuillez vérifier le mot de passe saisi, sinon veuillez contacter votre supérieur pour le réinitialiser", 400))
    }
    else {
        //create Token 
        const token = jwt.sign({ id: user.Matricule }, process.env.JWT_TOKEN, { expiresIn: process.env.TOKEN_EXPIRATION + 'h' })
          res.status(200).json({
              Status: "Success",
              matricule : req.body.Matricule,
              msg : "utilisateur Connecté avec Succes",
              token,
              tokenExpiration :  process.env.TOKEN_EXPIRATION
            })
    }
}
exports.protect = async (req, res, next) => {
     if (req.path == '/api/v1/SignIn') return next();
    //vérifier si le token exist dans le headers de requéte HTTP
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next( new AppError("vous n'êtes pas connecté, veuillez vous connecter pour avoir accès",401))
    }
    // Vérifier la validité de token 
    let decode
    try {
       decode = await promisify(jwt.verify)(token, process.env.JWT_TOKEN)
    } catch (error) {
        return next(new AppError(error.message, 401));
    }
    // vérifier si le user associer a ce token exist ou non 
    user = await Utilisateur.findByPk(decode.id);
    console.log(user.MotDePasseChangedAt);
    !user && next(new AppError("l'utilisateur appartient à ce jeton n'existe plus", 401));
    // throw ERROR lorsque Mot de passe change pour changer le Token ( pour de demancde de re connecter)
    //console.log(parseInt(user.updatedAt.getTime() / 1000, 10) , parseInt(decode.iat,10));
    if (parseInt(user.updatedAt.getTime() / 1000, 10) > decode.iat){
        return next(new AppError('mot de passe changer veuillez vous connecter autre fois pour avoir accès'));
        
    }
    next();
}