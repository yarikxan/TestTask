const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

router.get('/getLogs', logController.getLogs);
router.post('/createLog', logController.createLog);

module.exports = router;
