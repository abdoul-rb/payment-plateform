const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DATABASE_URL, {});

connection.authenticate()
   .then((_) => console.log('pg connected !'))
   .catch(((e) => console.log('Connection with Sequelize failed')));

module.exports = connection;