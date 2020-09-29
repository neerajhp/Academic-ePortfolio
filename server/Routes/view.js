const express = require("express");
const router = express.Router();

const profileController = require("../Controllers/profileController");
const showcaseController = require("../Controllers/showcaseController");
const eduController = require("../Controllers/eduController");
const filesController = require("../Controllers/filesController");
const blogController = require("../Controllers/blogController");
const expController = require("../Controllers/experienceController");
const userController = require("../Controllers/userController");

const authenticate = require("../Middleware/authenticate");

// Gets the viewed user's profile
router.get('/profile', profileController.viewerGetProfile);

// Gets all of the viewed user's blogs
router.get('/blog', blogController.viewerGetAllBlogs);

// Gets all of the viewed user's experience
router.get('/experience', expController.viewerGetAllExperience);

// Gets the viewed user's education history
router.get('/education', eduController.viewerGetEdu);

// Gets the viewed user's featured works
router.get('/featured-work', showcaseController.viewerGetFeaturedWorks);

// Gets the viewed user's files
router.get('/files', filesController.viewerGetAllDocs);

// Gets the viewed user's info
router.get('/userInfo', async (req, res) => {
    userController.viewerGetUserInformation(req, res);
});


module.exports = router;