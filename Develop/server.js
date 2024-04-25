const express = require('express');
const routes = require('./routes');
// import sequelize connection
const { Sequelize, Model, DataTypes } = require('sequelize');

const client = new Sequelize(
  'ecom_db',
   'postgres',
    'pass', {
  host: 'localhost',
  dialect: 'postgres'
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});


module.exports = client