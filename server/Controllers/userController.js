const express = require("express");
const User = require("../Models/User");

// Create a new User
var signUp =  async (req, res) => {
    try{
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
    

        await newUser.save();
        res.status(200).send("User added");
        console.log(newUser);

    }catch(error){
        res.json(error);
        res.status(400).send({
            error: "An error has occurred"
        });
    }
};




module.exports = {
    signUp
}