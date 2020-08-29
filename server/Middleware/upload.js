const express = require("express");
const multer = require("multer");
// Allows storage of files in MongoDB
const GridFsStorage = require("multer-gridfs-storage");
require('dotenv').config();

// The mongoDB database
const storage = new GridFsStorage({
    url: process.env.DB_CONNECTION,
    file: (req, file) => {
        return{
            filename: file.originalname.toLowerCase().split(" ").join("-")// This is dependent on the case
        };
    }
});

// // Temporary storage for uploaded images
// const storage = multer.diskStorage({
//     // Destination will change
//     // At the moment this is just a placeholder
//     destination: (req, file, cb) => {
//         cb(null, "server/uploads/images");
//     },

//     // We also might have to change the way we name our files
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(" ").join("-");
//         cb(null, fileName);;
//     } 
// });

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
}).single("image");



module.exports = {
    imageUpload,
}
