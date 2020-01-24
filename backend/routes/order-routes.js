const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth } = require('../controllers/auth-controller');
const { userById } = require('../controllers/user-controller');
const { create } = require('../controllers/order-controller');

router.post('/order/create/:userId', requireSignIn, isAuth, create);

router.param('userId', userById);

module.exports = router;
