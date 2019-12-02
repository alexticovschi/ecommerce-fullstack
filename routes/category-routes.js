const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategoryById,
  readCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
} = require('../controllers/category-controller');
const {
  requireSignIn,
  isAuth,
  isAdmin
} = require('../controllers/auth-controller');
const { userById } = require('../controllers/user-controller');

router.get('/category/:categoryId', readCategory);
router.post(
  '/category/create/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  createCategory
);
router.put(
  '/category/:categoryId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  updateCategory
);
router.delete(
  '/category/:categoryId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  deleteCategory
);
router.get('/categories', getAllCategories);

router.param('categoryId', getCategoryById);
router.param('userId', userById);

module.exports = router;
