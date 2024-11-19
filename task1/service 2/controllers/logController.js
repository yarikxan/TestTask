const Log = require('../models/Log');
const { Op } = require('sequelize');

const logController = {
    createLog: async (req, res) => {
        try{
            const {plu, storeId, action} = req.body;
            if (!plu) return res.status(400).json({error: "PLU is required"});
            if (!storeId) return res.status(400).json({error: "StoreId is required"});
            if (!action) return res.status(400).json({error: "Action is required"});
            const date = new Date().toISOString();

            const log = await Log.create({
                plu,
                StoreId: storeId,
                action,
                date
            });

            res.status(200).json(log);
        } catch (err) {
            res.status(500).json({error: `Failed to create Log: ${err}`});
        }
    },

    getLogs: async (req, res) => {
        try{
            const {plu, storeId, dateMin, dateMax, action} = req.query;
            const where = {};

            if (dateMin) where.date = { [Op.gte]: shelfMin };
            if (dateMax) where.date = { ...where.date, [Op.lte]: dateMax };

            if (plu) where.plu = plu;
            if (storeId) where.StoreId = storeId;
            
            if (action) where.action = action;

            const logs = await Log.findAll({ where });
            res.status(200).json(logs);
        } catch (err) {
            res.status(500).json({error: `Logs not found: ${err}`});
        }
    } 
}

module.exports = logController;
