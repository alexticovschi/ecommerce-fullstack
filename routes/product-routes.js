const express = require('express');
const router = express.Router();

const {
  getProductById,
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product-controller');
const {
  requireSignIn,
  isAuth,
  isAdmin
} = require('../controllers/auth-controller');
const { userById } = require('../controllers/user-controller');

router.get('/product/:productId', readProduct);
router.post(
  '/product/create/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  createProduct
);
router.delete(
  '/product/:productId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  deleteProduct
);
router.put(
  '/product/:productId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  updateProduct
);

router.param('userId', userById);
router.param('productId', getProductById);

module.exports = router;
