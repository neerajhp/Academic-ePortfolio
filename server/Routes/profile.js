const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profileController");

// Gets everything needed for the user's profile display
router.get("/", profileController.getAllInfo);

// Gets the user's cv
router.get("/cv", profileController.getCV);

// Gets the user's profile picture
router.get("/profile-pic", profileController.getProfilePic);

router.get("/education", (req, res) => {
    res.send("User's education history");
});

router.put("/highschool", (req, res) => {
    res.send("Edit highschool info");
});

router.put("/university", (req, res) => {
    res.send("Edit university info");
})

router.get("/bio", (req, res) => {
    res.send("User's bio");
});

router.put("/bio", (req, res) => {
    res.send("Edit bio");
});



module.exports = router;