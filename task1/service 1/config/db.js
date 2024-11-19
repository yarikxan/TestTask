const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdb', 'admin', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
