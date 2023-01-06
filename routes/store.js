const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const sellerController = require('../controllers/sellerController');

router.get('/', itemController.index);

router.get('/category/:category', itemController.item_category_get);

router.get('/item/:id', itemController.item_id_get);

router.get('/seller/create', sellerController.seller_create_get);

module.exports = router;