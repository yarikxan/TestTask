const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Store = require('./Store');
const Product = require('./Product');

const StockLevel = sequelize.define('StockLevel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shelfQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ProductId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products', 
            key: 'id' 
        }
    },
    StoreId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Stores', 
            key: 'id' 
        }
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['ProductId', 'StoreId']
        }
    ]
});


module.exports = StockLevel;
