const express = require("express");
// const upload = require("express-fileupload");
const ProduitRouter = require("./Routes/ProduitsRouter");
const LienProTypeAtelierRouter = require("./Routes/LienProTypeAtelierRouter");
const UtilisateurRouter = require("./Routes/UtilisateurRouter");
const AtelierRouter = require("./Routes/AtelierRouter");
const SDTPRARouter = require("./Routes/SDTPRARouter");
const AuthentificationRouter = require("./Routes/AuthentificationRouter");
const ClientRouter = require("./Routes/ClientRouter");
const FournisseurRouter = require("./Routes/FournisseurRouter");
const LotRouter = require("./Routes/LotRouter");
const SerialNumberRouer = require("./Routes/SerialNumberRouter");
const EtiquetteRouter = require("./Routes/EtiquetteRouter");
const AuthentificationController = require("./Controllers/AuthentificationController");
const ComposentRouter = require("./Routes/ComposentRouter");
const FormRouter = require("./Routes/FormRouter");
const OFRouter = require("./Routes/OFRouter");
const TagRouter = require("./Routes/TagRouter");
const EtiquettesImprimeesRouter = require("./Routes/EtiquettesImprimeesRouter");
const HistoriqueProduitRouter = require("./Routes/HistoriqueProduitRouter");
const HistoriqueVerificationEtiquetteRouter = require("./Routes/HistoriqueVerificationEtiquetteRouter");
const ProblemRouter = require("./Routes/ProblemRouter");
const PdfFileRouter = require("./Routes/PdfFileRouter");
const AppError = require("./Utils/AppError");
const Utilisateur = require("./Models/UtilisateurModel");
var cors = require("cors");
// ----------------------------------------------- On fait appelle a tous les middleware que nous besoin ici ------------------------------
const app = express();
// pour accéeder au propriéter body de requéte HTTP
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// use third party middleware ( middleware from npm)
// app.use(morgan("dev"));
app.use(cors());

// app.use(upload());
app.all("*", AuthentificationController.protect);
app.use("/api/v1/Produits", ProduitRouter);
app.use("/api/v1/LienProTypeAteliers", LienProTypeAtelierRouter);
app.use("/api/v1/utilisateurs", UtilisateurRouter);
app.use("/api/v1/Ateliers", AtelierRouter);
app.use("/api/v1/SDTPRAs", SDTPRARouter);
app.use("/api/v1/", AuthentificationRouter);
app.use("/api/v1/clients", ClientRouter);
app.use("/api/v1/fournisseurs", FournisseurRouter);
app.use("/api/v1/lots", LotRouter);
app.use("/api/v1/serialNumbers", SerialNumberRouer);
app.use("/api/v1/etiquettes", EtiquetteRouter);
app.use("/api/v1/composents", ComposentRouter);
app.use("/api/v1/forms", FormRouter);
app.use("/api/v1/OFs", OFRouter);
app.use("/api/v1/tags", TagRouter);
app.use("/api/v1/etiquetteImprimees", EtiquettesImprimeesRouter);
app.use("/api/v1/historiqueProduits", HistoriqueProduitRouter);
app.use("/api/v1/problems", ProblemRouter);
app.use("/api/v1/LabelFile/", PdfFileRouter);
app.use(
	"/api/v1/historiqueVerificationEtiquettes",
	HistoriqueVerificationEtiquetteRouter
);
// create first account for admin
try {
	Utilisateur.findAll().then((val) => {
		if (val.length == 0) {
			Utilisateur.create({
				status: true,
				matricule: "0000",
				nom: "admin",
				prenom: "admin",
				role: "Administrateur",
				motDePasse: "admin",
				statut: true,
				atelierLiecod: null,
				UAP: null,
				nomPC: "",
			})
				.then(() => {
					console.log("utilisateur Admin Créé avec Succées");
				})
				.catch((e) => {
					console.log("creation error");
					console.log(e);
				});
		}
	});
} catch (e) {
	console.log(e);
}
// Handling Unhandled Routes
app.all("*", (req, res, next) => {
	next(new AppError("Page Not Found at URI : " + req.originalUrl, 404));
});
// Handling App Error
app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	res.status(err.statusCode).json({
		Status: err.status,
		StatusCode: err.statusCode,
		Isoprational: err.oprational,
		message: err.message,
		stack: err.stack,
	});
});
module.exports = app;
