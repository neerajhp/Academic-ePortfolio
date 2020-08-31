const Document = require("../Models/Document");
const multer = require("multer");
const AWS = require("aws-sdk");
require('dotenv').config();

// Allows the upload of an image to the database
const uploadSingle = async (req, res) => {
    try{
        if(req.file){
            console.log(req.file);
            
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
const uploadMultiple = async (req, res, userID) => {
    try{
        console.log(req.files);

        if(req.files.length <= 0){
            res.send("You must select at least 1 file");
        }

        res.send(req.files.length + " files have been uploaded");

        // Creates a document reference for each file 
        // These references are then saved to mongoDB
        for(var i = 0; i < req.files.length; i++){
            saveFileReference(req.files[i], userID);
        }

        //req.files.forEach(saveFileReference);
    }catch(err){
        res.status(400).send({error: "Unable to upload files."});
        console.log(err);
    }
};

const saveFileReference = (file, userID) => {
    var newFile = {
        user_id: userID,
        fileLink: file.location,
        s3_key: file.originalname
    }

    var document = new Document(newFile);
    document.save((err, file) => {
        if(err){
            throw err;
        }
    });
}

module.exports = {
    uploadSingle,
    uploadMultiple
};
