const express = require('express');
const router = express.Router();

const {
  getProductById,
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getRelatedProducts,
  getAllCategories,
  getProductsBySearch
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
router.get('/products', getAllProducts);
router.get('/products/categories', getAllCategories);
router.get('/products/related/:productId', getRelatedProducts);
router.post('/products/search', getProductsBySearch);

router.param('userId', userById);
router.param('productId', getProductById);

module.exports = router;
