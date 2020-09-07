const Document = require("../Models/Document");
const multer = require("multer");
const AWS = require("aws-sdk");
require('dotenv').config();


// Allows the upload of a single file
const uploadSingle = async (req, res) => {
    try{
        if(req.file){
            await saveFileReference(req.file, req.query.userID)
            
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

        // Creates a document reference for each file 
        // These references are then saved to mongoDB
        for(var i = 0; i < req.files.length; i++){
            // Maybe make this function return boolean values
            // If its false, then we have to somehow notify the user that this file already exists
            saveFileReference(req.files[i], req.query.userID);
        }

    }catch(err){
        res.status(400).send({error: "Unable to upload files."});
        console.log(err);
    }
};

// Saves a reference to the uploaded file in mongoDB
const saveFileReference = async (file, userID) => {
    // Check for file in mongoDB
    var newFile = {
        user_id: userID,
        fieldName: file.fieldname,
        fileLink: file.location,
        s3_key: file.originalname
    }

    console.log(newFile);
    
    await Document.findOne({s3_key: newFile.s3_key, user_id: userID})
    .then(async searchedFile => {
        if(!searchedFile){
            var document = new Document(newFile);
            document.save((err, file) => {
                if(err){
                    throw err;
                }else{
                    console.log("File to be saved");
                }
            });
          
        } else{
            console.log("File already exists");
            // Make the user upload again?
            // Rename the file?
        }
    });
}

module.exports = {
    uploadSingle,
    uploadMultiple
};
