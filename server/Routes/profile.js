const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profileController");
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
router.post("/education", profileController.postEdu);
// Get
router.get("/education", profileController.getEdu);
// Update
router.put("/education", profileController.putEdu);
// Delete
router.delete("/education", profileController.deleteEdu);


router.get("/bio", profileController.getBio);

router.put("/bio", profileController.updateBio);



module.exports = router;