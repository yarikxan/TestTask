const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    StoreId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
    	type: DataTypes.DATE,
    	allowNull: false
    },
    action: {
    	type: DataTypes.STRING,
    	allowNull: false
    }
}, {timestamps: false});

module.exports = Log;
