const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images/");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, fileName);;
    } 
});

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
    imageUpload: imageUpload
}
