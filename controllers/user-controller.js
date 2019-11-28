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
