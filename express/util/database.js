const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'P@vlovska1991', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;