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
const storage = new GridFsStorage({
    url: process.env.DB_CONNECTION,
    file: (req, file) => {
        return{
            filename: file.originalname.toLowerCase()// This is dependent on the case
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

// Middleware for uploading single images
// Can be used for the profile picture
const imageSingleUpload = multer({
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

// Middleware for uploading multiple images
const imageMultipleUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
            cb(null, true);
        } else{
            cb(null, false);
            return cb(new Error("Only .png, .jpg, and .jpeg are allowed"));
        }
    }
}).array("images", 5);

// Upload of documents
// Can be used for the eportfolio document upload
const documentUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Only .pdf and .docx are allowed"));
        }
    }

}).array("documents", 10);


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

// This function uploads documents to aws s3 server
// This might be the main document upload function
const altDocumentUpload = multer({
    // Need to somehow make a folder for every registered user and we need to link this folder to the userID somehow
    storage: multerS3({
        acl: "public-read",
        s3: s3,
        bucket: "documents-eportfolio/Documents",
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Only .pdf and .docx are allowed"));
        }
    }
}).array("documents", 5);


module.exports = {
    imageSingleUpload,
    imageMultipleUpload,
    documentUpload,
    altDocumentUpload
}
