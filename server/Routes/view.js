const express = require("express");
const router = express.Router();

const profileController = require("../Controllers/profileController");
const showcaseController = require("../Controllers/showcaseController");
const eduController = require("../Controllers/eduController");
const blogController = require("../Controllers/blogController");
const expController = require("../Controllers/experienceController");

const authenticate = require("../Middleware/authenticate");

// Gets all of the viewed user's blogs
router.get('/blog', blogController.viewerGetAllBlogs);

// Gets all of the viewed user's experience
router.get('/experience', expController.viewerGetAllExperience);


module.exports = router;