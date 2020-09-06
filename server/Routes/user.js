const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController.js");


router.get("/", (req, res) => {
    res.send("You are in the users page");
});

router.get("/signup", (req, res) => {
    res.send("You are in the signup page");
});

router.post("/signup", async(req,res)=>{
    userController.postSignup(req, res);
});

router.get("/login", (req, res) => {
    res.send("Click here to login");
});

router.post("/login", async (req, res) => {
  userController.postLogin(req, res);
});

//Edit profile endpoint
//change names or create new route file instead
router.post("/editprofile/highschool", async (req, res) => {
    userController.postEduHigh(req, res);
});

router.post("/editprofile/university", async (req, res) => {
    //console.log(userController);
    userController.postEduUni(req, res);
});

module.exports = router;
