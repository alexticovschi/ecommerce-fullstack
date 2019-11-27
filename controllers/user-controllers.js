const User = require('../models/user-model');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(400).json({
        error
      });
    }
    res.json({
      user
    });
  });
};
