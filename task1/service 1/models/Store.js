const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Product = require('./Product');
const StockLevel = require('./StockLevel');

const Store = sequelize.define('Store', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false});

module.exports = Store;
