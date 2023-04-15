const express = require('express');
const morgan = require('morgan');
const upload = require('express-fileupload');
const { print, getPrinters } = require('pdf-to-printer')
const ProduitRouter = require('./Routes/ProduitsRouter')
const LienProTypeAtelierRouter = require('./Routes/LienProTypeAtelierRouter')
const UtilisateurRouter = require('./Routes/UtilisateurRouter')
const AtelierRouter = require("./Routes/AtelierRouter")
const SDTPRARouter = require("./Routes/SDTPRARouter")
const AuthentificationRouter = require('./Routes/AuthentificationRouter');
const ClientRouter = require('./Routes/ClientRouter');
const FournisseurRouter = require('./Routes/FournisseurRouter');
const LotRouter = require('./Routes/LotRouter');
const SerialNumberRouer = require('./Routes/SerialNumberRouter');
const EtiquetteRouter = require('./Routes/EtiquetteRouter');
const AuthentificationController = require('./Controllers/AuthentificationController')
const AppError = require('./Utils/AppError');
var cors = require('cors');
// ----------------------------------------------- On fait appelle a tous les middleware que nous besoin ici ------------------------------
const app = express();
// pour accéeder au propriéter body de requéte HTTP
app.use(express.json());
// use third party middleware ( middleware from npm)
app.use(morgan('dev'));
app.use(cors());
app.use(upload()) 
app.all('*', AuthentificationController.protect);
app.use('/api/v1/Produits',ProduitRouter);
app.use('/api/v1/LienProTypeAtelier', LienProTypeAtelierRouter);
app.use('/api/v1/utilisateur', UtilisateurRouter)
app.use('/api/v1/Atelier', AtelierRouter);
app.use('/api/v1/SDTPRA',SDTPRARouter);
app.use('/api/v1/SignIn', AuthentificationRouter);
app.use('/api/v1/client', ClientRouter);
app.use('/api/v1/fournisseur',FournisseurRouter);
app.use('/api/v1/lot', LotRouter);
app.use('/api/v1/serialNumber',SerialNumberRouer);
app.use('/api/v1/etiquette',EtiquetteRouter);

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
    });
app.post('/api/v1/printPDF/', async (req, res) => {
  try {
  const options = { copies: req.body.copies, monochrome: true, paperSize: 'A4', printDialog: false, printer: req.body.printer }
    await print('test.pdf', options);
    res.json(body);
  } catch (err) {
    res.status(400).json({
      Status: "Failed",
      erreur : err
    })
  }
  
});
app.get('/api/v1/printPDF/', async (req, res) => {
  const listPrinter = await (await getPrinters()).map((val)=>val.name)
  res.json(listPrinter)
})
// Handling Unhandled Routes
app.all('*', (req, res,next) => {
  next(new AppError("Page Not Found at URI : " + req.originalUrl,404))
})
// Handling App Error 
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    Status: err.status,
    StatusCode: err.statusCode,
    Isoprational : err.oprational,
    message: err.message,
    stack : err.stack
  });
});
module.exports = app;