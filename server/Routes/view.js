const express = require("express");
const router = express.Router();

const profileController = require("../Controllers/profileController");
const showcaseController = require("../Controllers/showcaseController");
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

router.get('/userInfo', async (req, res) => {
    userController.viewerGetUserInformation(req, res);
});


module.exports = router;