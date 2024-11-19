const { StockLevel, Product, Store } = require("../models");
const { Op } = require('sequelize');
const createLog = require('../createLog');

const stockLevelController = {
    createStockLevel: async (req, res) => {
        try{
            const { plu, shelfQuantity = 0, orderQuantity = 0 } = req.body;
            if (!plu) return res.status(400).json({error: "PLU is required"});
            if(!shelfQuantity && !orderQuantity) return res.status(400).json({error: "Must be atleast some quantity"});
            if (typeof shelfQuantity !== 'number' || typeof orderQuantity !== 'number') {
                return res.status(400).json({ error: "Invalid quantity values" });
            }
            
            const product = await Product.findOne({where: { plu }});
            if (!product) throw new Error("Product not found");

            const [stockLevel, created] = await StockLevel.upsert({
                shelfQuantity,
                orderQuantity,
                StoreId: product.StoreId,
                ProductId: product.id
            });

            const logRes = createLog(plu, product.StoreId, "createStockLevel");
            if (logRes.error) {console.log(logRes.error);}

            if (created) {
                return res.status(201).json({ message: "Created", stockLevel});
            } else {
                return res.status(200).json({ message: "Updated", stockLevel})
            }
        } catch (err) {
            res.status(500).json({error: `Failed to create StockLevel: ${err}`});
        }
    },

    getStockLevels: async (req, res) => {
        try{
            const {plu, storeId, shelfMin, shelfMax, orderMin, orderMax} = req.query;
            const where = {};
           
            if (shelfMin) where.shelfQuantity = { [Op.gte]: shelfMin };
            if (shelfMax) where.shelfQuantity = { ...where.shelfQuantity, [Op.lte]: shelfMax };

            if (orderMin) where.orderQuantity = { [Op.gte]: orderMin };
            if (orderMax) where.orderQuantity = { ...where.orderQuantity, [Op.lte]: orderMax };

            const include = [];

            if (plu) include.push({model: Product, where: { plu }, required: true});
            if (storeId) include.push({model: Store, where: { id: storeId }, required: true});

            const stockLevels = await StockLevel.findAll({
                where: where,
                include: include,
            });

            res.status(200).json(stockLevels);
        } catch (err) {
            res.status(500).json({error: `Stock not found: ${err}`});
        }

    },

    increaseStockLevel: async(req, res) => {
        try{
            const { plu, storeId = 1, amountShelf = 0, amountOrder = 0 } = req.body;
            if (!plu) return res.status(400).json({error: "PLU is required"});
            
            const product = await Product.findOne({where: { plu }});
            if (!product) throw new Error("Product not found");


            const existingStockLevel = await StockLevel.findOne({where: { ProductId: product.id, StoreId: storeId}});
            if (!existingStockLevel) return res.status(404).json({error: "Stock not found"});

            existingStockLevel.shelfQuantity = existingStockLevel.shelfQuantity + amountShelf;
            existingStockLevel.orderQuantity = existingStockLevel.orderQuantity + amountOrder;
            await existingStockLevel.save();
            
            const logRes = createLog(plu, product.StoreId, "increaseStockLevel");
            if(logRes.error) {console.log(logRes.error);}

            res.status(200).json(existingStockLevel);
        } catch (err) {
            res.status(500).json({error: `Failed to increase StockLevel: ${err}`})
        }
    },

    decreaseStockLevel: async(req, res) => {
        try{
            const { plu, storeId = 1, amountShelf = 0, amountOrder = 0 } = req.body;
            if (!plu) return res.status(400).json({error: "PLU is required"});
            
            const product = await Product.findOne({where: { plu }});
            if (!product) throw new Error("Product not found");


            const existingStockLevel = await StockLevel.findOne({where: { ProductId: product.id, StoreId: storeId}});
            if (!existingStockLevel) return res.status(404).json({error: "Stock not found"});

            existingStockLevel.shelfQuantity = existingStockLevel.shelfQuantity - amountShelf;
            existingStockLevel.orderQuantity = existingStockLevel.orderQuantity - amountOrder;
            await existingStockLevel.save();
            
            const logRes = createLog(plu, product.StoreId, "decreaseStockLevel");
            if(logRes.error) {console.log(logRes.error);}
            
            res.status(200).json(existingStockLevel);
        } catch (err) {
            res.status(500).json({error: `Failed to increase StockLevel: ${err}`})
        }
    }
}

module.exports = stockLevelController;
