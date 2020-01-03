const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth } = require('../controllers/auth-controller');
const { userById } = require('../controllers/user-controller');
const {
  generateToken,
  processPayment
} = require('../controllers/braintree-controller');

router.get('/braintree/getToken/:userId', requireSignIn, isAuth, generateToken);
router.post(
  '/braintree/payment/:userId',
  requireSignIn,
  isAuth,
  processPayment
);

router.param('userId', userById);

module.exports = router;
