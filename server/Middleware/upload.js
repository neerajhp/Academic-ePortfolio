const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
AWS.config.update({ region:'ap-southeast-2' });
// Allows storage of files in MongoDB
require('dotenv').config();

const maxFileSize = 8 * 1024 * 1024;
const maxImageSize = 10 * 1024 * 1024;

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
            var fullPath = "user-" + req.user.id + "/" + file.originalname;
            cb(null, fullPath);
        },
        limits: {fileSize: maxFileSize}
    });


// Middleware for uploading images and video
const imageUpload = multer({
    storage: createStorage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "video/mp4"){
            cb(null, true);
        } else{
            cb(null, false);
            return cb(new Error("Only .png, .jpg, and .jpeg are allowed"));
        }
    },
    limits: {fileSize: maxImageSize}
});


// Allowed file formats
var allowedFiles = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "video/mp4", "image/png", "image/jpeg", "application/octet-stream"];

// This function uploads files to aws s3 server
// Every user will get their own folder in the bucket
const fileUpload = multer({
    // Need to somehow make a folder for every registered user and we need to link this folder to the userID somehow
    storage: createStorage,
    fileFilter: (req, file, cb) => {
        if(allowedFiles.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Only .pdf, .docx, .mp4 are allowed"));
        }
    },
    limits: {fileSize: maxFileSize}
})

// Allows the upload of pdf or docx
const documentUpload = multer({
    // Need to somehow make a folder for every registered user and we need to link this folder to the userID somehow
    storage: createStorage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/octet-stream"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Only .pdf and .docx are allowed"));
        }
    },
    limits: {fileSize: maxFileSize}
})


module.exports = {
    imageUpload,
    fileUpload,
    documentUpload
}
