const Document = require("../Models/Document");
const multer = require("multer");
const AWS = require("aws-sdk");
require('dotenv').config();

// Allows the upload of an image to the database
const uploadSingle = async (req, res) => {
    try{
        if(req.file){
            
            res.status(200).send("file saved");
        }else{
            throw Error();
        }
    }catch(err){
        res.status(400).send({error: "Unable to upload file."});
        console.log(err);
    }
};

// Allows the upload of multiple files
const uploadMultiple = async (req, res) => {
    try{
        console.log(req.files);

        if(req.files.length <= 0){
            res.send("You must select at least 1 file");
        }

        res.send(req.files.length + " files have been uploaded");
    }catch(err){
        res.status(400).send({error: "Unable to upload files."});
        console.log(err);
    }
};

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     Bucket: "documents-eportfolio"
// })

// const uploadDocument = async (userID, )

module.exports = {
    uploadSingle,
    uploadMultiple
};
