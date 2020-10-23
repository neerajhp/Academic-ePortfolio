const User = require('../Models/User');

const findUserID = async (req, res, next) => {
  try {
    let userName = req.params.userName;
    if (userName == null) {
      res.status(404).send('User not found');
      return;
    }
    await User.findOne({ userName: userName }, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result == null) return res.status(404).send('User not found')
        if (result.private == true) return res. status(403).send('User profile is private')
        req.viewID = result._id;
        next();
      }
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  findUserID,
};
