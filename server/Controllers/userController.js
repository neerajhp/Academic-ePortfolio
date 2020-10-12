const express = require('express');
const router = express.Router();
const User = require('../Models/User.js');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
      skills: req.body.skills
    });
    // Look for duplicate email
    await User.findOne({email: newUser.email}, (err, account) => {
      if(err){
        console.log(err);
        throw err;
      }
      // If its a new email, check the username's uniqueness
      if(!account){
        console.log("email is unique");
        let userName = generateUniqueUserName(newUser.email);
          userName.then(function(result){
            newUser.userName = result;
            newUser.save();
            res.status(200).json("New user saved");
          });
        

      }else{
        res.status(400).json("An account with this email already exists");
      }
    });
  });
};

// Suggests a definitely unique username (Checks the db)
// Unfortunately I can't get it to work
const generateUniqueUserName =  async (email) => {

  var regExp = /(.+)@/
  var proposedName = email.match(regExp)[1];
  
  var username;
  var allGood = false;
  while(!allGood){
    console.log("Start the loop");
    await User.findOne({userName: proposedName}, (err, result) => {
      if(err){
        throw err;
      }
      if(!result){
        console.log("Username's good");
        allGood = true;
        username = proposedName;
      }else{
        proposedName += Math.floor((Math.random() * 100) + 1);
        console.log("Username not good");
      }
    });
  }
  return username;
}

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

// Allows users to change their username
const changeUserName = async (req, res) => {
  try{
    await User.findOne({userName: req.body.userName}, (err, result) => {
      if(err){
        throw err;
      }
      if(!result){
        User.findByIdAndUpdate(req.user.id, {userName: req.body.userName}, {new: true}, (err, result) => {
          if(err){
            throw err;
          }
          if(result){
            res.status(200).json(result.userName);
          }else{
            res.status(404).json("The user was not found");
          }
        });
      }else{
        // Suggest a new username
        res.status(400).json("Username not unique");
      }
    });
  }catch(error){
    res.status(400).json("Failed to update username");
  }
}

// Function to find the info associated with the given id
const findInfo = async (userID) => {
  let userInfo;
  await User.findById(userID, (err, result) => {
    if(err){
        throw err;
    }
    if(result){
        userInfo = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            mobileNumber: result.mobileNumber,
            birthDate: result.birthDate
        }
    }else{
        userInfo = null;
    }
  });
  return userInfo;

}

const getUserInformation = async (req, res) => {
  try{
    await User.findById(req.user.id, (err, result) => {
      if(err){
          throw err;
      }
      if(result){
          userInfo = {
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email,
              mobileNumber: result.mobileNumber,
              birthDate: result.birthDate
          }
          res.status(200).json(userInfo);
      }else{
          res.status(404).json("User not found");
          //userInfo = null;
      }
    });
      // let userInfo = await findInfo(req.user.id);
      // if(userInfo){
      //   res.status(200).json(userInfo);
      // }else{
      //   res.status(400).json("User not found");
      // }
  }catch(error){
      res.status(400).send(error);
  }
}

const viewerGetUserInformation = async (req, res) => {
  try{
    let userID = req.viewID;
    let userInfo = await findInfo(userID);
      if(userInfo){
        res.status(200).json(userInfo);
      }else{
        res.status(400).json("User not found");
      }
    }catch(error){
      res.status(400).send(error);
    }
}

// Edits the user's personal information (except email and password)
const editUserInformation = async (req, res) => {
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
              res.status(200).json("Successfully updated user information");
              // if(result.nModified == 0){
              //   res.status(400).json("Attempted to edit a property that doesn't exist in the record");
              // }else{
              //   res.status(200).json("Successfully updated user information");
              // }
          }else{
              res.status(404).json("User not found");
          }
      })
  }catch(error){
      res.status(400).send(error);
  }
}

const getUserID = async (req, res) => {
  try{
      let userID = await User.findById(req.user.id);
      if(userID){
        res.status(200).json(userID._id);
      }else{
        res.status(400).json("User not found");
      }
  }catch(error){
      res.status(400).send(error);
  }
}

// Updates a logged in user's email
const updateEmail = async (req, res) => {
  try{

    await User.findByIdAndUpdate(req.user.id, {"email": req.body.email}, (err, result) => {
      if(err){
        throw err;
      }
      if(result){
        res.status(200).json("Email updated");
      }else{
        res.status(404).json("User not found");
      }
    })
  }catch(error){
    res.status(400).json("Failed to update the user's email");
  }
}

// Allows the logged in user to change their password
// User should input their old password before making a new one
const changePassword = async (req, res) => {
  try{
    let user = await User.findById(req.user.id, (err, result) => {
      if(err){
        throw err;
      }
      if(result){
        return result;
      }
    });
    
    bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
      if(err){
        throw err;
      }
      if(result){
        bcrypt.hash(req.body.newPassword, saltRounds, async (err, hash) => {
          if(err){
            throw err;
          }
          User.findByIdAndUpdate(req.user.id, {password: hash}, (err, result) => {
            res.status(200).json("Password updated");
          })
        });
      }else{
        res.status(400).json("User inputted the wrong password");
      }
    })
  }catch(error){
    res.status(400).json("Errow while trying to change password");
  }

}

// Disables the tutorial
const finishTutorial = async (req, res) => {
  try{
    await User.findByIdAndUpdate(req.user.id, {"tutorial": false}, {"new": true}, (err, result) => {
      if(err){
        throw err;
      }
      if(result){
        res.status(200).json(result.tutorial);
      }else{
        res.status(404).json("User not found");
      }
    })
  }catch(error){
    res.status(400).json("Error while trying to update tutorial field");
  }
}

module.exports = {
  postSignup,
  postLogin,
  getUserInformation,
  viewerGetUserInformation,
  editUserInformation,
  updateEmail,
  changePassword,
  getUserID,
  finishTutorial,
  changeUserName
}

