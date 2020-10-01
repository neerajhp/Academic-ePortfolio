const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");

const parse = require("../Middleware/upload");
const authenticate = require("../Middleware/authenticate");
const uploadController = require("../Controllers/uploadController");

// Use authentication
router.use(authenticate.authenticateToken);

// Sends a form for testing purposes
router.get("/", (req, res) => {
    res.sendFile(path.resolve("./server/public/upload.html"))
});


// Handles the document uploads (pdf, docx)
const multipleFiles = parse.documentUpload.array("document", 5);
router.post("/files", (req, res) => {
    multipleFiles(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(400).json(err);
            // A Multer error occurred when uploading.
        }else{
            uploadController.uploadMultiple(req, res);
        }
    });

});

// Handles a single document upload (pdf, docx)
const singleFile = parse.documentUpload.single("document");
router.post("/file", (req, res) => {
    singleFile(req, res, (err) => {
        if(err){
            console.log(err);
            res.status(400).json(err);
        }else{
            uploadController.uploadSingle(req, res);
        }
    })
})

// Handles the cv upload
const cvUpload = parse.documentUpload.single("cv");
router.post("/cv", (req, res) => {
    cvUpload(req, res, (err) => {
        if(err){
            console.log(err);
            res.status(400).json(err);
        }else{
            uploadController.uploadCV(req, res);
        }
    })
});


// Handles the profile picture upload
const profilePicUpload = parse.imageUpload.single("profile-pic");
router.post("/profile-pic", (req, res) => {
    profilePicUpload(req, res, (err) => {
        if(err){
            console.log(err);
            res.status(400).json(err);
        }else{
            uploadController.uploadProfilePic(req, res);
        }
    })
});

// Handles the upload of a single image
const singleImage = parse.imageUpload.single("image");
router.post("/image", (req, res) => {
    singleImage(req, res, (err) => {
        if(err){
            console.log(err);
            res.status(400).json(err);
        }else{
            uploadController.uploadSingle(req, res);
        }
    });
});

// Handles the upload of multiple images
const multipleImages = parse.imageUpload.array("image", 5);
router.post("/images", (req, res) => {
    multipleImages(req, res, (err) => {
        if(err){
            console.log(err);
            res.status(400).json(err);
        }else{
            uploadController.uploadMultiple(req, res);
        }
    })
});


module.exports = router;
