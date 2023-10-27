const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));
// call in our sequelize and dotenv
const Sequelize = require('sequelize');
// use the turinary and jawsdb to launch the app on heroku
const sequelize = process.env.JAWSDB_URL
? new Sequelize(process.env.JAWSDB_URL)
: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        decimalNumbers: true,
    },
    logging: false
});

module.exports = sequelize