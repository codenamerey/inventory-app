const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/sign-up', userController.sign_up_get);

module.exports = router;