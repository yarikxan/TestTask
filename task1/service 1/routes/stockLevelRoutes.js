const express = require('express');
const stockLevelController = require('../controllers/stockLevelController');

const router = express.Router();

router.get('/getStockLevels', stockLevelController.getStockLevels);
router.post('/createStockLevel', stockLevelController.createStockLevel);
router.post('/increaseStockLevel', stockLevelController.increaseStockLevel);
router.post('/decreaseStockLevel', stockLevelController.decreaseStockLevel);

module.exports = router;
