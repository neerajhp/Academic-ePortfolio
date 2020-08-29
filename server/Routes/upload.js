const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const parse = require("../Middleware/upload");
const uploadController = require("../Controllers/uploadController");

// Sends a form for testing purposes
router.get("/", (req, res) => {
    res.sendFile(path.resolve("./server/public/upload.html"))
});

// Handles the file upload
router.post("/files", (req, res) => {

});

// Handles the image upload
router.post("/image", parse.imageUpload, uploadController.uploadImage);


module.exports = router;
