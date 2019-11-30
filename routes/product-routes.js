const express = require('express');
const router = express.Router();

const {
  createProduct,
  readProduct,
  deleteProduct,
  getProductById
} = require('../controllers/product-controller');
const {
  requireSignIn,
  isAuth,
  isAdmin
} = require('../controllers/auth-controller');
const { userById } = require('../controllers/user-controller');

router.get('/product/:productId', readProduct);
router.delete(
  '/product/:productId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  deleteProduct
);
router.post(
  '/product/create/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  createProduct
);

router.param('userId', userById);
router.param('productId', getProductById);

module.exports = router;
