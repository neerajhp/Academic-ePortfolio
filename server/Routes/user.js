const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js');

const authenticate = require('../Middleware/authenticate');

router.get('/', (req, res) => {
  res.send('You are in the users page');
});

router.get('/signup', (req, res) => {
  res.send('You are in the signup page');
});

router.post('/signup', async (req, res) => {
  userController.postSignup(req, res);
});

router.get('/login', (req, res) => {
  res.send('Click here to login');
});

router.post('/login', async (req, res) => {
  userController.postLogin(req, res);
});

router.post('/googlelogin', (req, res) => {
  userController.googleLogin(req, res);
});

router.post('/facebooklogin', (req, res) => {
  userController.facebookLogin(req, res);
});

router.get('/userInfo', authenticate.authenticateToken, async (req, res) => {
  userController.getUserInformation(req, res);
});

router.put('/userInfo', authenticate.authenticateToken, async (req, res) => {
  userController.editUserInformation(req, res);
});

router.get('/getID', authenticate.authenticateToken, async (req, res) => {
  userController.getUserID(req, res);
});


// Update email (logged in user only)
router.put("/update/email", authenticate.authenticateToken, async (req, res) => {
    userController.updateEmail(req, res);
});

router.put("/update/username", authenticate.authenticateToken, async (req, res) => {
    userController.changeUserName(req, res);
})

// Change password (logged in user only)
router.put("/update/password", authenticate.authenticateToken, async (req, res) => {
    userController.changePassword(req, res);
});

router.put("/update/tutorial", authenticate.authenticateToken, async (req, res) => {
    userController.finishTutorial(req, res);
})

module.exports = router;

