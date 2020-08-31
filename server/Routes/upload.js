const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");

const parse = require("../Middleware/upload");
const uploadController = require("../Controllers/uploadController");

const Document = require("../Models/Document");

// Sends a form for testing purposes
router.get("/", (req, res) => {
    res.sendFile(path.resolve("./server/public/upload.html"))
});


// Handles the document uploads
// The userID is added to the function so that the userID can be attached to the document object in mongoDB
// This isn't final. It depends on how the user upload will work.
router.post("/files", parse.altDocumentUpload(1001), (req, res) => {
    try{
        uploadController.uploadMultiple(req, res, 1001);
    }catch(err){
        res.status(400).json(err);    
    }
    
});

// Handles the image upload
router.post("/image", parse.imageSingleUpload, uploadController.uploadSingle);


module.exports = router;
