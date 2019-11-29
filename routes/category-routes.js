const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category-controller');
const {
  requireSignIn,
  isAuth,
  isAdmin
} = require('../controllers/auth-controller');
const { userById } = require('../controllers/user-controller');

router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);

router.param('userId', userById);

module.exports = router;
