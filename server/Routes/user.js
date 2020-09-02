const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController.js");
const User = require("../Models/User.js");
var bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/", (req, res) => {
    res.send("You are in the users page");
});

router.get("/signup", (req, res) => {
    res.send("You are in the signup page");
});

router.post("/signup", async(req,res)=>{
    userController.postSignup(req, res);
})

router.get("/login", (req, res) => {
    res.send("Click here to login");
});

router.post("/login", async (req, res) => {
  userController.postLogin(req, res);
})

module.exports = router;
