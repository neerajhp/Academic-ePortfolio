const express = require("express");
const router = express.Router();

const profileController = require("../Controllers/profileController");
const showcaseController = require("../Controllers/showcaseController");
const eduController = require("../Controllers/eduController");

const { authenticateToken } = require("../Middleware/authenticate");

router.use(authenticateToken);


// Gets everything needed for the user's profile display
router.get("/", profileController.getProfile);

router.delete("/deleteProfile", profileController.deleteProfile);

// Gets the user's cv
router.get("/cv", profileController.getCV);

// Gets the user's profile picture
router.get("/profile-pic", profileController.getProfilePic);

// Gets the user's social media
router.get("/social-media", profileController.getSocialMedia);
// Edits the user's social media links
router.put("/social-media", profileController.addSocialMedia);

// Change the user's privacy settings
router.put("/private", profileController.changePrivacy);
router.get("/private", profileController.getPrivacy);

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
router.get("/aboutMe", profileController.getAboutMe);
router.put("/aboutMe", profileController.updateAboutMe);

// Skills tab
router.get("/skills", profileController.getSkills);
router.put("/skills", profileController.addSkills);
router.delete("/skills", profileController.removeSkills);

// Showcase tab

router.post("/featured-work", showcaseController.createFeaturedWork);

// Gets all of the users' featured works
router.get("/featured-work", showcaseController.getAllFeaturedWorks);
// Removes all of the user's featured works
router.delete("/featured-work", showcaseController.clearShowcase);

// Edits a specific featured work
router.put("/featured-work/:id", showcaseController.editFeaturedWork);
// Attach files to specific featured work
router.put("/featured-work/files/:id", showcaseController.addFiles);

// Add urls to specific featured work
//router.put("/featured-work/url/:id", showcaseController.addUrl);

// Removes the urls specified in the body's list
//router.delete("/featured-work/url/:id", showcaseController.removeUrl);

// Gets a specific featured work by its object id
router.get("/featured-work/:id", showcaseController.getFeaturedWork);
// Removes a specific featured work by its object id
router.delete("/featured-work/:id", showcaseController.removeFeaturedWork);




module.exports = router;