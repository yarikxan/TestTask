const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();


router.get('/getProducts', productController.getProducts);
router.post('/createProduct', productController.createProduct);

module.exports = router;
