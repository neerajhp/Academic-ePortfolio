const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");

const parse = require("../Middleware/upload");
const uploadController = require("../Controllers/uploadController");

// Sends a form for testing purposes
router.get("/", (req, res) => {
    res.sendFile(path.resolve("./server/public/upload.html"))
});


// Handles the document uploads
// The userID is added to the function so that the userID can be attached to the document object in mongoDB
// This isn't final. It depends on how the user upload will work.
// Maybe get the userID from the request?
router.post("/files", parse.altDocumentUpload.array("document", 5), uploadController.uploadMultiple);

// Handles the upload of a single document
// Probably best for cv?
router.post("/cv", parse.altDocumentUpload.single("cv"), uploadController.uploadSingle);

// Handles the upload of a single image
// Can be used for profile picture uploads maybe?
router.post("/profile-pic", parse.imageUpload.single("profile-pic"), uploadController.uploadSingle);

// Handles the upload of multiple images
router.post("/images", parse.imageUpload.array("image", 5), uploadController.uploadMultiple);


module.exports = router;
