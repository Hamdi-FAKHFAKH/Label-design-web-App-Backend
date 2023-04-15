//----------------------------- server listner -----------------------------------//
const dotenv = require('dotenv');
const app = require('./app');


// config port & env 
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;
// Lancer le serveur 
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
