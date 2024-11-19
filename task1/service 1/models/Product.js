const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Store = require('./Store');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false});



module.exports = Product;
