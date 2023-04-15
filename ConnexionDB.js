// Connection BD
const dotenv = require('dotenv');
const tedious = require('tedious');
const { Sequelize } = require('sequelize');
dotenv.config({ path: './config.env' });
const config = {
  username: process.env.USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_LOCAL,
  dialect: 'mssql',
  sync: { alter: true},
  dialectOptions: {
        "instanceName": "SQLEXPRESS"
    },
  dialectModule: tedious,
    define: { freezeTableName: true },

};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
sequelize.authenticate()
  .then(console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;