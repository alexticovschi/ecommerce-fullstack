const express = require('express');
const router = express.Router();

const { createProduct } = require('../controllers/product-controller');
const {
  requireSignIn,
  isAuth,
  isAdmin
} = require('../controllers/auth-controller');
const { userById } = require('../controllers/user-controller');

router.post(
  '/product/create/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  createProduct
);

router.param('userId', userById);

module.exports = router;
