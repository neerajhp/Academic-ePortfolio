const express = require("express");
const router = express.Router();

const profileController = require("../Controllers/profileController");
const showcaseController = require("../Controllers/showcaseController");
const eduController = require("../Controllers/eduController");

const authenticate = require("../Middleware/authenticate")

router.use(authenticate.authenticateToken);

// Gets everything needed for the user's profile display
router.get("/", profileController.getAllInfo);

// Gets the user's cv
router.get("/cv", profileController.getCV);

// Gets the user's profile picture
router.get("/profile-pic", profileController.getProfilePic);

// Education Section //

// Create
router.post("/education", eduController.postEdu);
// Get
router.get("/education", eduController.getEdu);
// Update
router.put("/education/:id", eduController.putEdu);
// Delete
router.delete("/education/:id", eduController.deleteEdu);
router.delete("/education", eduController.deleteAllEdu);

// Bio manipulation
router.get("/bio", profileController.getBio);
router.put("/bio", profileController.updateBio);

// Skills tab
router.get("/skills", profileController.getSkills);
router.put("/skills", profileController.addSkills);
router.delete("/skills", profileController.removeSkills);

// Showcase tab

router.post("/featured-work", showcaseController.createFeaturedWork);
// Edits a specific featured work
router.put("/featured-work/:id", showcaseController.editFeaturedWork);
// Gets a specific featured work by its object id
router.get("/featured-work/:id", showcaseController.getFeaturedWork);
// Gets all of the users' featured works
router.get("/featured-work", showcaseController.getAllFeaturedWorks);
// Removes a specific featured work by its object id
router.delete("/featured-work/:id", showcaseController.removeFeaturedWork);
// Removes all of the user's featured works
router.delete("/featured-work", showcaseController.clearShowcase);



module.exports = router;