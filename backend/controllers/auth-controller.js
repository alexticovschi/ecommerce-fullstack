const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};

exports.signin = (req, res) => {
  //  find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      console.error(error);
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup'
      });
    }

    // if user is found make sure email & password match
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: `Email and password don't match`
      });
    }

    // generate a signed token with user id & secret string
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 'token' in cookie with expiry date
    res.cookie('token', token, { expire: new Date() + 9999 });

    // return response with user & token to frontend client
    const { _id, email, name, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Successfully signed out' });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
  console.log('USER PROFILE:', req.profile);
  // if there is a user, authorize it to access the resource
  const user = req.profile && req.auth && req.profile._id == req.auth._id;

  // prevent user from accessing resource
  if (!user) {
    return res.status(403).json({ error: 'Access denied! Admin resource.' });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  // if the user is not admin, return an error message
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Access Denied! You need admin permission to access this resource.'
    });
  }
  next();
};
