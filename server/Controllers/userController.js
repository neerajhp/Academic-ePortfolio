const express = require('express');
const router = express.Router();
const User = require('../Models/User.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.postSignup = async (req, res) => {
  //hash the password
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
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
        res.send('User ' + newUser.firstName + ' added');
      } else {
        res.send('User already exists...');
      }
    });
  });
};

exports.postLogin = async (req, res) => {
  var newUser = {};
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  //test if password matches
  await User.findOne({
    email: newUser.email,
  })
    .then((profile) => {
      if (!profile) {
        res.send('User not exist');
      } else {
        //compared the hashed password the user entered and the one in database
        bcrypt.compare(req.body.password, profile.password, function (
          err,
          result
        ) {
          if (result == true) {
            res.send('User authenticated');
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
