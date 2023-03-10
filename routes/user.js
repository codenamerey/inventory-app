const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/sign-up', userController.sign_up_get);

router.post('/sign-up', userController.sign_up_post);

router.get('/log-in', userController.log_in_get);

router.post('/log-in', userController.log_in_post);

router.get('/log-out', userController.log_out_get);

module.exports = router;