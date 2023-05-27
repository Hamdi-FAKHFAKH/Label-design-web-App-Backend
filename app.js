const express = require("express");
const morgan = require("morgan");
// const upload = require("express-fileupload");
const multer = require("multer");
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
const AppError = require("./Utils/AppError");
var cors = require("cors");
const fs = require("fs");
// ----------------------------------------------- On fait appelle a tous les middleware que nous besoin ici ------------------------------
const app = express();
// pour accéeder au propriéter body de requéte HTTP
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// use third party middleware ( middleware from npm)
app.use(morgan("dev"));
app.use(cors());

// app.use(upload());
app.all("*", AuthentificationController.protect);
app.use("/api/v1/Produits", ProduitRouter);
app.use("/api/v1/LienProTypeAtelier", LienProTypeAtelierRouter);
app.use("/api/v1/utilisateur", UtilisateurRouter);
app.use("/api/v1/Atelier", AtelierRouter);
app.use("/api/v1/SDTPRA", SDTPRARouter);
app.use("/api/v1/SignIn", AuthentificationRouter);
app.use("/api/v1/client", ClientRouter);
app.use("/api/v1/fournisseur", FournisseurRouter);
app.use("/api/v1/lot", LotRouter);
app.use("/api/v1/serialNumber", SerialNumberRouer);
app.use("/api/v1/etiquette", EtiquetteRouter);
app.use("/api/v1/composent", ComposentRouter);
app.use("/api/v1/forms", FormRouter);
app.use("/api/v1/OF", OFRouter);
app.use("/api/v1/tag", TagRouter);
app.use("/api/v1/etiquetteImprimee", EtiquettesImprimeesRouter);

// app.use(function (req, res, next) {
// 	//Enabling CORS
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, ContentType, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
// 	);
// 	next();
// });
//
// app.post("/api/v1/printPDF/", async (req, res) => {
// 	try {
// 		const options = {
// 			copies: req.body.copies,
// 			monochrome: true,
// 			paperSize: "A4",
// 			printDialog: false,
// 			printer: req.body.printer,
// 		};
// 		await print("test.pdf", options);
// 		res.json(body);
// 	} catch (err) {
// 		res.status(400).json({
// 			Status: "Failed",
// 			erreur: err,
// 		});
// 	}
// });
// app.get("/api/v1/printPDF/", async (req, res) => {
// 	const listPrinter = await (await getPrinters()).map((val) => val.name);
// 	res.json(listPrinter);
// });

//check if label file exist
app.post("/api/v1/LabelFile/", (req, res) => {
	if (fs.existsSync(req.body.path)) {
		res.status(200).json({ exist: true, message: "File Found" });
	} else {
		res.status(400).json({ exist: false, message: "File Not Found" });
	}
});

//delete File
app.delete("/api/v1/LabelFile/", (req, res) => {
	fs.unlink(req.body.path, (err) => {
		if (!err) {
			res.status(200).json({ deleted: true, message: "File deleted" });
		} else {
			res.status(200).json({ deleted: false, message: "File not deleted" });
		}
	});
});
//savePdfFile
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "PdfFiles/");
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.originalname);
// 	},
// });
// const uploadFile = multer({ storage: storage });
app.post("/api/v1/savePdfFile/", (req, res) => {
	// fs.writeFile("sample.pdf", res.body, "base64", function (err) {
	// 	console.log(err);
	// });
	const pdfString = req.body.data.split(",")[1];
	fs.writeFile(
		`./PdfFiles/${req.body.fileName}`,
		pdfString,
		"base64",
		function (err) {
			console.log(err);
		}
	);
	res.status(200).json({
		msg: "success",
	});
});

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
