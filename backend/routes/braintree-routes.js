const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth } = require('../controllers/auth-controller');
const { userById } = require('../controllers/user-controller');
const { generateToken } = require('../controllers/braintree-controller');

router.get('/braintree/getToken/:userId', requireSignIn, isAuth, generateToken);

router.param('userId', userById);

module.exports = router;
