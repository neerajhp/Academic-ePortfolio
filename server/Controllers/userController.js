const express = require('express');
const router = express.Router();
//const User = require("../Models/User.js");
const { User, EduUni, EduHigh } = require('../Models/User.js');

// const EduUni = require("../Models/User.js");
// const EduHigh = require("../Models/User.js");
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.postSignup = async (req, res) => {
  //hash the password
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    //const User = models.User;

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
        res.send('User added');
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

//Education History user control

exports.postEduUni = async (req, res) => {
  const newEduUni = new EduUni({
    //get userid from from authentication JWT
    //user_id: ,
    uniName: req.body.uniName,
    courseName: req.body.courseName,
    majorName: req.body.majorName,
    monthStart: req.body.monthStart,
    yearStart: req.body.yearStart,
    monthEnd: req.body.monthEnd,
    yearEnd: req.body.yearEnd,
    graduated: req.body.graduated,
  });

  try {
    await newEduUni.save((err, file) => {
      if (err) {
        console.log('Error found');
        throw err;
      } else {
        console.log('saved');
        res.send(file);
      }
    });
  } catch (err) {
    res.status(400).json("Something's wrong");
  }

  //plan out how to check for profile
  // await EduUni.findOne({
  //     //user_id
  // })
  // .then(async profile => {
  //     if(!profile){
  //       newEduUni.save()
  //       res.send("University Education History added");
  //     } else{
  //       res.send("User already exists...");
  //     }
};

exports.postEduHigh = async (req, res) => {
  const newEduHigh = new EduHigh({
    //get userid from from authentication JWT
    //user_id: ,
    highName: req.body.highName,
    monthStart: req.body.monthStart,
    yearStart: req.body.yearStart,
    monthEnd: req.body.monthEnd,
    yearEnd: req.body.yearEnd,
    graduated: req.body.graduated,
  });

  try {
    await newEduHigh.save((err, file) => {
      if (err) {
        console.log('Error found');
        throw err;
      } else {
        console.log('saved');
        res.json(file);
      }
    });
  } catch (err) {
    res.status(400).json("Something's wrong");
  }
};
