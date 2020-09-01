const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const Document = require("../Models/Document");
const AWS = require("aws-sdk");
AWS.config.update({ region:'ap-southeast-2' });
// Allows storage of files in MongoDB
const GridFsStorage = require("multer-gridfs-storage");
require('dotenv').config();

// The mongoDB database
// const storage = new GridFsStorage({
//     url: process.env.DB_CONNECTION,
//     file: (req, file) => {
//         return{
//             filename: file.originalname.toLowerCase()// This is dependent on the case
//         };
//     }
// });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

const createStorage = multerS3({
        acl: "public-read",
        s3: s3,
        bucket: "documents-eportfolio",
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            var fullPath = "user-" + req.query.userID + "/" + file.originalname;
            cb(null, fullPath);
        }
    });


// Middleware for uploading single images
// Can be used for the profile picture
// const imageSingleUpload = multer({
//     storage: createStorage,
//     fileFilter: (req, file, cb) => {
//         if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
//             cb(null, true);
//         } else{
//             cb(null, false);
//             return cb(new Error("Only .png, .jpg, and .jpeg are allowed"));
//         }
//     }
// }).single("image");

const imageUpload = multer({
    storage: createStorage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
            cb(null, true);
        } else{
            cb(null, false);
            return cb(new Error("Only .png, .jpg, and .jpeg are allowed"));
        }
    }
});

// // Middleware for uploading multiple images
// const imageMultipleUpload = multer({
//     storage: createStorage,
//     fileFilter: (req, file, cb) => {
//         if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
//             cb(null, true);
//         } else{
//             cb(null, false);
//             return cb(new Error("Only .png, .jpg, and .jpeg are allowed"));
//         }
//     }
// }).array("images", 5);

// Allowed file formats
var allowedFiles = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "image/jpeg", "video/mp4"];

// This function uploads documents to aws s3 server
// Every user will get their own folder in the bucket
const altDocumentUpload = multer({
    // Need to somehow make a folder for every registered user and we need to link this folder to the userID somehow
    storage: createStorage,
    fileFilter: (req, file, cb) => {
        if(allowedFiles.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Only .pdf, .docx, .png and .jpg are allowed"));
        }
    }
})


module.exports = {
    //imageSingleUpload,
    imageUpload,
    altDocumentUpload
}
