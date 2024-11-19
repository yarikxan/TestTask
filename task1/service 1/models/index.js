const Store = require('./Store');
const Product = require('./Product');
const StockLevel = require('./StockLevel');

Store.hasMany(Product);
Product.belongsTo(Store);

Store.hasMany(StockLevel);
StockLevel.belongsTo(Store);

Product.hasMany(StockLevel);
StockLevel.belongsTo(Product);



module.exports = {
    Store,
    Product,
    StockLevel
};

