require('dotenv').config();

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401).json('You are not authorised');
  } else {
    jwt.verify(token, process.env.SECRET_OR_KEY, (err, user) => {
      if (err) {
        console.log(token);
        console.log(err);
        res.status(403).json(err);
      } else {
        req.user = user;
        next();
      }
    });
  }
}

module.exports = {
  authenticateToken,
};
