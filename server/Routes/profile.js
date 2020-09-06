const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profileController");

// Gets everything needed for the user's profile display
router.get("/", profileController.getAllInfo);

// Gets the user's cv
router.get("/cv", profileController.getCV);

// Gets the user's profile picture
router.get("/profile-pic", profileController.getProfilePic);

// Education Section //

router.get("/education", (req, res) => {
    res.send("User's education history");
});

// Create education history highschool
router.post("/education/highschool", profileController.postEduHigh);

// Create education history university
router.post("/education/university", profileController.postEduUni);

router.put("/education/highschool", (req, res) => {
    res.send("Edit highschool info");
});

// Update education history university
router.put("/education/university", profileController.putEduUni);


router.get("/bio", (req, res) => {
    res.send("User's bio");
});

router.put("/bio", profileController.updateBio);



module.exports = router;