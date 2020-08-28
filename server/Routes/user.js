const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const userController = require("../Controllers/userController");
const mongoose  = require("mongoose");

router.get("/", (req, res) => {
    res.send("You are in the users page");
});

router.get("/signup", (req, res) => {
    res.send("You are in the signup page");
});

router.post("/signup", (req, res) => {
    userController.signUp(req,res);

});

router.get("/login", (req, res) => {
    res.send("Click here to login");
    // Call on a login function from the user controller
});

module.exports = router;