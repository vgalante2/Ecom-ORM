const express = require('express');
const routes = require('./routes');
// import sequelize connection
const { Sequelize } = require('sequelize');

const client = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
client.sync({force: false})
.then(() => {

  app.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
  });

})





