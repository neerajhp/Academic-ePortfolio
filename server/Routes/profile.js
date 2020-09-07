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

// University education history
// Create
router.post("/education/university", profileController.postEduUni);
// Get
router.get("/education/university", profileController.getEduUni);
// Update
router.put("/education/university", profileController.putEduUni);
// Delete
router.delete("/education/university", profileController.deleteEduUni);

// Highschool education history
// Create
router.post("/education/highschool", profileController.postEduHigh);
// Get
router.get("/education/highschool", profileController.getEduHigh);
// Update
router.put("/education/highschool", profileController.putEduHigh);
// Delete
router.delete("/education/highschool", profileController.deleteEduHigh);




router.get("/bio", (req, res) => {
    res.send("User's bio");
});

router.put("/bio", profileController.updateBio);



module.exports = router;