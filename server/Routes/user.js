const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");

// For signup
// Maybe sign up might need its own route instead
// Login and sign up might have to be in different routes?
router.get("/", (req, res) => {
    res.send("You are in the users page");
});

router.get("/signup", (req, res) => {
    res.send("You are in the signup page");
});

router.post("/signup", (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthDate: req.body.birthDate,
        university: req.body.university
    });

    console.log(newUser.firstName);

    res.send(req.body);

    // newUser.save()
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json({message: err});
    //     })
    // Call on a sign up function from the user controller
});

// For login
router.get("/login", (req, res) => {
    res.send("Click here to login");
    // Call on a login function from the user controller
});

module.exports = router;