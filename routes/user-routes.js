const express = require('express');
const router = express.Router();

const {
  requireSignIn,
  isAuth,
  isAdmin
} = require('../controllers/auth-controller');

const { userById } = require('../controllers/user-controller');

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

// anytime there is an user id in the route parameter, execute 'userById' method
// and make the user information available in the req object
router.param('userId', userById);

module.exports = router;
