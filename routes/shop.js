const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const sellerController = require('../controllers/sellerController');

router.get('/', itemController.index);

module.exports = router;