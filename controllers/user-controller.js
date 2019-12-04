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

exports.readUserProfile = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.json(req.profile);
};

exports.updateUserProfile = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (error, user) => {
      if (error) {
        return res
          .status(400)
          .json({ error: 'You are not authorized to perform this action' });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};
