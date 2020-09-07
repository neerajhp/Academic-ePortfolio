const express = require('express');
const router = express.Router();
const User = require('../Models/User.js').User;
var bcrypt = require('bcrypt');
const saltRounds = 10;

//SIGNUP
exports.postSignup = async (req, res) => {
  //hash the password
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    //const User = models.User;

    const newUser = new User({
      //dummyID: req.body.dummyID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      biography: req.body.biography,
    });

    // console.log(newUser.firstName);
    // console.log(newUser.lastName);
    // console.log(newUser.email);
    // console.log(newUser.password);
    // console.log("User added");

    //see if the email is already registered
    await User.findOne({
      email: newUser.email,
    }).then(async (profile) => {
      if (!profile) {
        newUser.save();
        res.send('User added');
      } else {
        res.send('User already exists...');
      }
    });
  });
};

//LOGIN
exports.postLogin = async (req, res) => {
  var newUser = {};
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  console.log(newUser.email);
  //Check if user exists
  await User.findOne({
    email: newUser.email,
  })
    .then((profile) => {
      //Email does not exist
      if (!profile) {
        res.send('User does not exist');
      } else {
        //compared the hashed password the user entered and the one in database
        bcrypt.compare(req.body.password, profile.password, function (
          err,
          result
        ) {
          if (result == true) {
            res.send('User authenticated');
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name,
            };

            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              }
            );
          } else {
            res.send('incorrect password!');
          }
        });
      }
    })
    .catch((err) => {
      console.log('Error is ', err.message);
    });
};
