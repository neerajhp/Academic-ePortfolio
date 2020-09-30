const express = require("express");
const router = express.Router();

const profileController = require("../Controllers/profileController");
const showcaseController = require("../Controllers/showcaseController");
const eduController = require("../Controllers/eduController");
const filesController = require("../Controllers/filesController");
const blogController = require("../Controllers/blogController");
const expController = require("../Controllers/experienceController");
const userController = require("../Controllers/userController");

const userName2userID = require("../Middleware/userName2userID")

router.param("userName", userName2userID.findUserID);

// Gets the viewed user's profile
router.get('/profile/:userName', profileController.viewerGetProfile);

// Gets all of the viewed user's blogs
router.get('/blog/:userName', blogController.viewerGetAllBlogs);

// Gets all of the viewed user's experience
router.get('/experience/:userName', expController.viewerGetAllExperience);

// Gets the viewed user's education history
router.get('/education/:userName', eduController.viewerGetEdu);

// Gets the viewed user's featured works
router.get('/featured-work/:userName', showcaseController.viewerGetFeaturedWorks);

// Gets the viewed user's files
router.get('/files/:userName', filesController.viewerGetAllDocs);

// Gets the viewed user's info
router.get('/userInfo/:userName', async (req, res) => {
    userController.viewerGetUserInformation(req, res);
});


module.exports = router;