const User = require("../Models/User.js");
const Token = require("../Models/Token");
const Reset = require("../Models/Reset");

var bcrypt = require("bcrypt");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

// Email verification //
const myOAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const myAccessToken = myOAuth2Client.getAccessToken();

// Token Confirmation
const confirmationPost = async (req, res) => {
  // Find a matching token
  Token.findOne(
    {
      token: req.params.token,
    },
    function (err, token) {
      if (!token) {
        return res
          .status(400)
          .json(
            "We were unable to find a valid token. Your token my have expired."
          );
      } else {
        // If we found a token, find a matching user
        User.findOne(
          {
            _id: token.userID,
            email: req.body.email,
          },
          function (err, user) {
            if (!user)
              return res
                .status(400)
                .json("We were unable to find a user for this token.");
            if (user.isVerified)
              return res
                .status(400)
                .json("This user has already been verified.");

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
              if (err) {
                return res.status(500).json({
                  msg: err.message,
                });
              }
              res
                .status(200)
                .json("The account has been verified. Please log in.");
            });
          }
        );
      }
    }
  );
};

const sendTokenPost = async (req, res) => {
  await User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      // Confirmation Token
      var token = new Token({
        userID: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      token.save(function (err) {
        if (err) {
          return res.status(500).json({
            msg: err.message,
          });
        }
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "homealone30022@gmail.com",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: myAccessToken,
          },
        });
        var mailOptions = {
          from: "homealone30022@gmail.com",
          to: user.email,
          subject: "Account Verification",
          text:
            "Hello from Team Home Alone,\n\n" +
            "Please verify your account by clicking the link: \n" +
            req.headers.referer +
            "/confirmation/" +
            token.token +
            "\n",
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).json({
              msg: err.message,
            });
          }
          res
            .status(200)
            .json("A verification email has been sent to " + user.email + ".");
        });
      });
    }
  );
};

// Resending Token
const resendTokenPost = async (req, res) => {
  await User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (!user)
        return res
          .status(400)
          .json("We were unable to find a user with that email.");
      if (user.isVerified) {
        return res
          .status(400)
          .json("This account has already been verified. Please log in.");
      } else {
        // Create a verification token, save it, and send email
        var token = new Token({
          userID: user._id,
          token: crypto.randomBytes(16).toString("hex"),
        });

        // Save the token
        token.save(function (err) {
          if (err) {
            return res.status(500).json({
              msg: err.message,
            });
          }

          // Send the email
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "homealone30022@gmail.com",
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: myAccessToken,
            },
          });
          var mailOptions = {
            from: "homealone30022@gmail.com",
            to: user.email,
            subject: "Account Verification",
            text:
              "Hello from Team Home Alone,\n\n" +
              "Please verify your account by clicking the link: \n" +
              req.headers.referer +
              "/confirmation/" +
              token.token +
              "\n",
          };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).json({
                msg: err.message,
              });
            }
            res
              .status(200)
              .json(
                "A verification email has been sent to " + user.email + "."
              );
          });
        });
      }
    }
  );
};

// Password Reset

const resetPut = async (req, res) => {
  // Find a matching token
  Reset.findOne(
    {
      token: req.params.token,
    },
    function (err, token) {
      if (!token) {
        return res
          .status(400)
          .json(
            "We were unable to find a valid token. Your token my have expired."
          );
      } else {
        // If we found a token, find a matching user
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          User.findOneAndUpdate(
            { _id: token.userID },
            { password: hash },
            (err, user) => {
              if (err)
                return res.status(500).json({
                  msg: err.message,
                });
              if (!user)
                return res
                  .status(400)
                  .json("We were unable to find a user for this token.");
            }
          );
        });
        Reset.findOneAndDelete(
          {
            token: req.params.token,
          },
          (err, result) => {
            if (result) {
              return res
                .status(200)
                .json("The password has been reset. Please log in.");
            } else {
              console.log("not deleted");
            }
          }
        );
      }
    }
  );
};

// Sending reset password link
const sendResetPost = async (req, res) => {
  await User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json("An error has occured");
      }
      if (!user) {
        return res
          .status(400)
          .json("We were unable to find a user with that email.");
      } else {
        // Create a verification token, save it, and send email
        var token = new Reset({
          userID: user._id,
          token: crypto.randomBytes(16).toString("hex"),
        });

        // Save the token
        token.save(function (err) {
          if (err) {
            return res.status(500).json({
              msg: err.message,
            });
          }

          // Send the email
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "homealone30022@gmail.com",
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: myAccessToken,
            },
          });
          var mailOptions = {
            from: "homealone30022@gmail.com",
            to: user.email,
            subject: "Account Reset",
            text:
              "Hello from Team Home Alone,\n\n" +
              "Please reset your account by clicking the link: \n" +
              req.headers.referer +
              "/" +
              token.token +
              "\n",
          };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).json({
                msg: err.message,
              });
            }
            res
              .status(200)
              .json("A reset email has been sent to " + user.email + ".");
          });
        });
      }
    }
  );
};
module.exports = {
  confirmationPost,
  sendTokenPost,
  resendTokenPost,
  resetPut,
  sendResetPost,
};
