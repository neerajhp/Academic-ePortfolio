const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
var bcrypt = require("bcrypt");
const saltRounds = 10;

// For signup
// Maybe sign up might need its own route instead
// Login and sign up might have to be in different routes?
router.get("/", (req, res) => {
    res.send("You are in the users page");
});

router.get("/signup", (req, res) => {
    res.send("You are in the signup page");
});

router.post("/signup", async (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,

        })

        console.log(newUser.firstName);
        console.log(newUser.lastName);
        console.log(newUser.email);
        console.log(newUser.password);
        console.log("User added");

        await User.findOne({
            email: newUser.email
        })
        .then(async profile => {
            if(!profile){
              newUser.save()
              res.send("User added");
            } else{
              res.send("User already exists...");
            }
        })
    })
});

// For login
router.get("/login", (req, res) => {
    res.send("Click here to login");
    // Call on a login function from the user controller
});

router.post("/login", async (req, res) => {
    var newUser = {};
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    //test if password matches 
    await User.findOne({
            email: newUser.email
        })
        .then(profile => {
            if (!profile) {
                res.send("User not exist");
            } else {
                bcrypt.compare(req.body.password, profile.password, function(err, result) {
                    // res.send(newUser.password);
                    // res.send(req.body.password);
                    if (result == true) {
                        res.send("User authenticated");
                    } else {
                        res.send("incorrect password!");
                    }
                });
            }
        })
        .catch(err => {
            console.log("Error is ", err.message);
        });
});

module.exports = router;