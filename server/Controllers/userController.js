const express = require("express");
const User = require("../Models/User");

// Create a new User
var signUp = async (req, res) => {
    console.log("My man");
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    console.log(newUser.firstName);
    console.log(newUser.lastName);

    newUser.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message: err});
        });
    // try{
    //     const newUser = new User({
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName,
    //         email: req.body.email
    //     });
    
    //     console.log(newUser.firstName);
    //     console.log(newUser.lastName);

    //     await newUser.save();
    //     res.status(200);

    // }catch(error){
    //     res.json(error);
    //     res.status(400).send({
    //         error: "An error has occurred"
    //     });
    // }
};

var helloWorld = () => console.log("Hell0 world");



module.exports = {
    signUp,
    helloWorld
}