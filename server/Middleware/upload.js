const express = require("express");
const multer = require("multer");

// Temporary storage for uploaded images
const storage = multer.diskStorage({
    // Destination will change
    // At the moment this is just a placeholder
    destination: (req, file, cb) => {
        cb(null, "server/uploads/images");
    },

    // We also might have to change the way we name our files
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, fileName);;
    } 
});

// Middleware for uploading images
const imageUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
            cb(null, true);
        } else{
            cb(null, false);
            return cb(new Error("Only .png, .jpg, and .jpeg are allowed"));
        }
    }
}).single("photo");



module.exports = {
    imageUpload,
}
