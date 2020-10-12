const express = require('express');
const router = express.Router();
const User = require('../Models/User.js');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');

const saltRounds = 10;

//************** Signup **************//
exports.postSignup = async (req, res) => {
  //hash the password
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      userName: req.body.userName,
      password: hash,
      //Format: YYYY-MM-DD
      birthDate: req.body.birthDate,
      mobileNumber: req.body.mobileNumber,
      biography: req.body.biography,
      skills: req.body.skills,
    });
    // Look for duplicate email
    await User.findOne({ email: newUser.email }, (err, account) => {
      if (err) {
        console.log(err);
        throw err;
      }
      // If its a new email, check the username's uniqueness
      if (!account) {
        console.log('email is unique');
        if (newUser.userName) {
          User.findOne({ userName: newUser.userName }, (err, result) => {
            // If the username doesn't exist in the db, then the user can be saved
            if (!result) {
              console.log('username is unique');
              newUser.save();
              res.status(200).json('New user saved');
            } else {
              // Suggest a username that is unique to the user
              console.log('userName not unique');
              let suggestedUserName = suggestUserName(newUser.userName);
              console.log('suggested: ' + suggestedUserName);
              res.status(400).json({
                message: 'Username not unique',
                suggestion: suggestedUserName,
              });
            }
          });
        } else {
          newUser.save();
          res.status(200).json('New user saved');
        }
      } else {
        res.status(400).json('An account with this email already exists');
      }
    });

    //Check if the email is already registered
    // await User.findOne({
    //   email: newUser.email,
    // }).then(async (profile) => {
    //   if (!profile) {
    //     newUser.save();
    //     res.status(201).json('User added');
    //   } else {
    //     res.status(409).send('Email already linked to account');
    //   }
    // });
  });
};

// Suggest a new user name (Doesn't check the db)
const suggestUserName = (userName) => {
  let proposedName = userName;
  proposedName += Math.floor(Math.random() * 100 + 1);
  return proposedName;
};

// Suggests a definitely unique username (Checks the db)
// Unfortunately I can't get it to work
const generateUniqueUserName = async (proposedName) => {
  return await User.findOne({ userName: proposedName })
    .then(function (account) {
      if (account) {
        console.log(`${proposedName} already exists`);
        proposedName += Math.floor(Math.random() * 100 + 1);
        return generateUniqueUserName(proposedName);
      }
      console.log('proposed name is unique ' + proposedName);
      return proposedName;
    })
    .catch(function (err) {
      console.log(err);
      throw err;
    });
};

//************** Login **************//
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
                expiresIn: 3600, // 1 year in seconds
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

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// Google Login
exports.googleLogin = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then((response) => {
      // console.log('GOOGLE LOGIN RESPONSE', response);
      const {
        email_verified,
        given_name,
        family_name,
        email,
      } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign(
              { id: user._id },
              process.env.SECRET_OR_KEY,
              {
                expiresIn: '7d',
              }
            );
            const { id, email } = user;
            return res.json({
              token,
              user: { id, email },
            });
          } else {
            let password = email + process.env.SECRET_OR_KEY;
            const randomID = Math.floor(Math.random() * Math.floor(999));
            newUser = new User({
              firstName: given_name,
              lastName: family_name,
              email: email,
              userName: `${given_name}.${family_name}.${randomID}`,
              password: password,
              //Format: YYYY-MM-DD
              birthDate: '',
              mobileNumber: '',
              biography: '',
              skills: '',
            });
            newUser.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google',
                });
              }
              const token = jwt.sign(
                { id: data._id },
                process.env.SECRET_OR_KEY,
                {
                  expiresIn: '7d',
                }
              );
              const { id, email } = data;
              return res.json({
                token,
                user: { id, email },
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again',
        });
      }
    });
};

//************** Helpers **************//
// Function to find the info associated with the given id
const findInfo = async (userID) => {
  let userInfo;
  await User.findById(userID, (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      userInfo = {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        mobileNumber: result.mobileNumber,
        birthDate: result.birthDate,
      };
    } else {
      userInfo = null;
    }
  });
  return userInfo;
};

exports.getUserInformation = async (req, res) => {
  try {
    await User.findById(req.user.id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        userInfo = {
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          mobileNumber: result.mobileNumber,
          birthDate: result.birthDate,
        };
        res.status(200).json(userInfo);
      } else {
        res.status(404).json('User not found');
        //userInfo = null;
      }
    });
    // let userInfo = await findInfo(req.user.id);
    // if(userInfo){
    //   res.status(200).json(userInfo);
    // }else{
    //   res.status(400).json("User not found");
    // }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.viewerGetUserInformation = async (req, res) => {
  try {
    let userID = req.viewID;
    let userInfo = await findInfo(userID);
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(400).json('User not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// Edits the user's personal information (except email and password)
exports.editUserInformation = async (req, res) => {
  try {
    const objectModel = Object.assign(req.body);
    if (objectModel.password || objectModel.email) {
      res.status(400).json('This function cannot change the password or email');
      return;
    }
    await User.updateOne({ _id: req.user.id }, objectModel, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        if (result.nModified == 0) {
          res
            .status(400)
            .json(
              "Attempted to edit a property that doesn't exist in the record"
            );
        } else {
          res.status(200).json('Successfully updated user information');
        }
      } else {
        res.status(404).json('User not found');
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserID = async (req, res) => {
  try {
    let userID = await User.findById(req.user.id);
    if (userID) {
      res.status(200).json(userID._id);
    } else {
      res.status(400).json('User not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
