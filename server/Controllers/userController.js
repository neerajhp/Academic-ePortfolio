const express = require('express');
const router = express.Router();
const User = require('../Models/User.js');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

//SIGNUP
exports.postSignup = async (req, res) => {
  //hash the password
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      //Format: YYYY-MM-DD
      birthDate: req.body.birthDate,
      mobileNumber: req.body.mobileNumber,
      biography: req.body.biography,
      skills: req.body.skills
    });

    //Check if the email is already registered
    await User.findOne({
      email: newUser.email,
    }).then(async (profile) => {
      if (!profile) {
        newUser.save();
        res.send('User added');
      } else {
        res.status(409).send('Email already linked to account');
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
        res.status(409).send('Email does not match our records');
      } else {
        //compared the hashed password the user entered and the one in database
        bcrypt.compare(req.body.password, profile.password, function (
          err,
          result
        ) {
          if (result == true) {
            // Create JWT Payload
            const payload = {
              id: profile._id,
              name: profile.firstName,
            };

            // Sign token
            jwt.sign(
              payload,
              process.env.SECRET_OR_KEY,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: token,
                });
              }
            );
          } else {
            res.status(409).send('Email and Password do not match our records');
          }
        });
      }
    })
    .catch((err) => {
      console.log('Error is ', err.message);
    });
};

exports.getUserInformation = async (req, res) => {
  try{
      await User.findById(req.user.id, (err, result) => {
          if(err){
              throw err;
          }
          if(result){
              const userInfo = {
                  firstName: result.firstName,
                  lastName: result.lastName,
                  email: result.email,
                  mobileNumber: result.mobileNumber,
                  birthDate: result.birthDate
              }
              res.status(200).json(userInfo);
          }else{
              res.status(404).json("User not found");
          }
      })
  }catch(error){
      res.status(400).send(error);
  }
}

// Edits the user's personal information (except email and password)
exports.editUserInformation = async (req, res) => {
  try{
      const objectModel = Object.assign(req.body);
      if(objectModel.password || objectModel.email){
        res.status(400).json("This function cannot change the password or email");
        return;
      }
      await User.updateOne({_id: req.user.id}, objectModel, (err, result) => {
          if(err){
              throw err;
          }
          if(result){
              if(result.nModified == 0){
                res.status(400).json("Attempted to edit a property that doesn't exist in the record");
              }else{
                res.status(200).json("Successfully updated user information");
              }
          }else{
              res.status(404).json("User not found");
          }
      })
  }catch(error){
      res.status(400).send(error);
  }
}

