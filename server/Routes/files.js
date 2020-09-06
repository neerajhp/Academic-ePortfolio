const express = require("express");
const router = express.Router();

const Document = require("../Models/Document");
const filesController = require("../Controllers/filesController");
const profileController = require("../Controllers/profileController");


// Get all documents that belong to the user
router.get("/", filesController.getAllDocs);

// Gets the cv of the user
router.get("/cv", profileController.getCV);

// Gets the user's profile picture
router.get("/profile-pic", profileController.getProfilePic);

// Gets the document based on the given object id
// I might put this method in a filescontroller
router.get("/:id", filesController.getDocument);

// Deletes a document based on its mongoDB id
router.delete("/:id", filesController.deleteDocument);

module.exports = router;