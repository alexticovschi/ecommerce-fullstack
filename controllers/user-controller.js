const User = require('../models/user-model');

exports.userById = (req, res, next, id) => {
  // find user by id and attach the profile info to the req object
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({ error: 'User not found' });
    }
    req.profile = user;
    next();
  });
};
