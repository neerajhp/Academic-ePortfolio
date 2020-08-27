const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const mongoose  = require("mongoose");

router.get("/", (req, res) => {
    res.send("You are in the users page");
});

router.get("/signup", (req, res) => {
    res.send("You are in the signup page");
});

router.post("/signup", (req, res) => {
    // Call on a sign up function from the user controller
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    console.log(newUser.firstName);
    console.log(newUser.lastName);

    newUser.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message: err});
        })

});

router.get("/login", (req, res) => {
    res.send("Click here to login");
    // Call on a login function from the user controller
});

module.exports = router;