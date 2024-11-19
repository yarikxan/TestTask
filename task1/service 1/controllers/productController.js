const { Product, Store } = require('../models');
const createLog = require('../createLog');

const productController = {

    createProduct: async (req, res) => {
        try{
            const store = await Store.findByPk("1");
            if (!store) throw new Error("Store not found");

            const { plu, name } = req.body;
            if(!plu || !name) return res.status(400).json({error: "bad request"}); 
            
            const product = await store.createProduct(req.body);
            
            const logRes = createLog(plu, store.id, "createProduct")
            if (logRes.error) {console.log(logRes.error);}

            res.status(201).json(product);
        } catch (err) {
            res.status(500).json({error: `Failed to create Product: ${err}`});
        }
    },

    getProducts: async (req, res) => {
        try{
            const { plu, name } = req.query;
            const where = {};

            if (plu) where.plu = plu;
            if (name) where.name = name;

            const products = await Product.findAll({ where });

            res.json(products);

        } catch(err) {
            res.status(500).json({error: `Failed to fetch products: ${err}`});
        }
    }
}


module.exports = productController;
