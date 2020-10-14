const express = require('express');
const router = express.Router();
const User = require('../Models/User.js');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');

const saltRounds = 10;

//SIGNUP
const postSignup = async (req, res) => {
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
        let userName = generateUniqueUserName(newUser.email);
          userName.then(function(result){
            newUser.userName = result;
            newUser.save();
            res.status(200).json("New user saved");
        });
        
        // Confirmation Token
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
        var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            res.status(200).send('A verification email has been sent to ' + user.email + '.');
          }); 
        })

      } else {
        res.status(400).json("An account with this email already exists");
      }
    });
  });
};

// Suggests a definitely unique username (Checks the db)
// Unfortunately I can't get it to work
const generateUniqueUserName = async (email) => {
  var regExp = /(.+)@/;
  var proposedName = email.match(regExp)[1];

  var username;
  var allGood = false;
  while (!allGood) {
    console.log('Start the loop');
    await User.findOne({ userName: proposedName }, (err, result) => {
      if (err) {
        throw err;
      }
      if (!result) {
        console.log("Username's good");
        allGood = true;
        username = proposedName;
      } else {
        proposedName += Math.floor(Math.random() * 100 + 1);
        console.log('Username not good');
      }
    });
  }
  return username;
};

//LOGIN
const postLogin = async (req, res) => {
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
      if (!profile) return res.status(409).send('Email does not match our records')
      // Account is not verified
      if (!profile.isVerified) {
        res.status(401).send('The account is not verified, please check your email')
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
const googleLogin = (req, res) => {
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

const facebookLogin = (req, res) => {
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      // .then((response) => console.log(response))
      .then((response) => {
        const { email, name } = response;
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
            let given_name = name.split(' ')[0];
            let family_name = name.split(' ')[1];
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
                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with facebook',
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
      })
      .catch((error) => {
        res.json({
          error: 'Facebook login failed. Try later',
        });
      })
  );
};
//************** Helpers **************//

// Allows users to change their username
const changeUserName = async (req, res) => {
  try {
    await User.findOne({ userName: req.body.userName }, (err, result) => {
      if (err) {
        throw err;
      }
      if (!result) {
        User.findByIdAndUpdate(
          req.user.id,
          { userName: req.body.userName },
          { new: true },
          (err, result) => {
            if (err) {
              throw err;
            }
            if (result) {
              res.status(200).json(result.userName);
            } else {
              res.status(404).json('The user was not found');
            }
          }
        );
      } else {
        // Suggest a new username
        res.status(400).json('Username not unique');
      }
    });
  } catch (error) {
    res.status(400).json('Failed to update username');
  }
};

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

const getUserInformation = async (req, res) => {
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

const viewerGetUserInformation = async (req, res) => {
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

const editUserInformation = async (req, res) => {
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
        res.status(200).json('Successfully updated user information');
        // if(result.nModified == 0){
        //   res.status(400).json("Attempted to edit a property that doesn't exist in the record");
        // }else{
        //   res.status(200).json("Successfully updated user information");
        // }
      } else {
        res.status(404).json('User not found');
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserID = async (req, res) => {
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

// Updates a logged in user's email
const updateEmail = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      { email: req.body.email },
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).json('Email updated');
        } else {
          res.status(404).json('User not found');
        }
      }
    );
  } catch (error) {
    res.status(400).json("Failed to update the user's email");
  }
};

// Allows the logged in user to change their password
// User should input their old password before making a new one
const changePassword = async (req, res) => {
  try {
    let user = await User.findById(req.user.id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        return result;
      }
    });

    bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        bcrypt.hash(req.body.newPassword, saltRounds, async (err, hash) => {
          if (err) {
            throw err;
          }
          User.findByIdAndUpdate(
            req.user.id,
            { password: hash },
            (err, result) => {
              res.status(200).json('Password updated');
            }
          );
        });
      } else {
        res.status(400).json('User inputted the wrong password');
      }
    });
  } catch (error) {
    res.status(400).json('Errow while trying to change password');
  }
};

// Disables the tutorial
const finishTutorial = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      { tutorial: false },
      { new: true },
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).json(result.tutorial);
        } else {
          res.status(404).json('User not found');
        }
      }
    );
  } catch (error) {
    res.status(400).json('Error while trying to update tutorial field');
  }
};

// Token Confirmation
const confirmationPost = async (req, res) => {
  // Find a matching token
  Token.findOne({ token: req.body.token }, function (err, token) {
    if (!token) {
      return res.status(400).send('We were unable to find a valid token. Your token my have expired.');
    } else {
      // If we found a token, find a matching user
      User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send('We were unable to find a user for this token.');
        if (user.isVerified) return res.status(400).send('This user has already been verified.');

        // Verify and save the user
        user.isVerified = true;
        user.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          res.status(200).send("The account has been verified. Please log in.");
        });
      });
    }
  });
}

// Resending Token
const resendTokenPost = async (req, res) => {

  User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) return res.status(400).send('We were unable to find a user with that email.');
      if (user.isVerified) {
        return res.status(400).send('This account has already been verified. Please log in.');
      } else {
        // Create a verification token, save it, and send email
        var token = new Token({ userID: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
      }
  });
};

module.exports = {
  postSignup,
  postLogin,
  googleLogin,
  facebookLogin,
  getUserInformation,
  viewerGetUserInformation,
  editUserInformation,
  updateEmail,
  changePassword,
  getUserID,
  finishTutorial,
  changeUserName,
  confirmationPost,
  resendTokenPost
}

