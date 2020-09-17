const Document = require("../Models/Document");
const multer = require("multer");
const AWS = require("aws-sdk");
require('dotenv').config();

const filesController = require("../Controllers/filesController");


// Allows the upload of a single file
const uploadSingle = async (req, res) => {
    try{
        if(req.file){
            await saveFileReference(req.file, req.user.id).then(result => {
                if(!result){
                    res.status(400).json("Failed to save a file reference");
                }else{
                    res.status(200).json(result);
                }
            });
            
        }else{
            throw Error();
        }
    }catch(err){
        res.status(400).send({error: "Unable to upload file."});
        console.log(err);
    }
};

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});


const uploadCV = async (req, res) => {
    await filesController.deleteCV(req, res);

    await uploadSingle(req, res);
    console.log("new cv uploaded");
}

const uploadProfilePic = async (req, res) => {
    await filesController.deleteProfilePic(req, res);

    await uploadSingle(req, res);
    console.log("new profile pic uploaded");
}

// Allows the upload of multiple files
const uploadMultiple = async (req, res) => {
    try{
        console.log(req.files);

        if(req.files.length <= 0){
            res.send("You must select at least 1 file");
        }

        //res.send(req.files.length + " files have been uploaded");

        // Creates a document reference for each file 
        // These references are then saved to mongoDB
        let newFiles = [];
        for(var i = 0; i < req.files.length; i++){
            // Maybe make this function return boolean values
            // If its false, then we have to somehow notify the user that this file already exists
            await saveFileReference(req.files[i], req.user.id).then(result => {
                if(!result){
                    console.log("Unabled to upload file");
                }else{
                    newFiles.push(result);
                }
            });
        }
        res.status(200).json(newFiles);
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
        s3_key: `user-${userID}/${file.originalname}`
    }
    let savedFile;
    
    // Looks for the existence of a file with the same key
    await Document.findOne({s3_key: newFile.s3_key, user_id: userID}, (err, result) => {
        if(!result){
            savedFile = new Document(newFile);
            console.log("This is a new file");
        }else{
            console.log("File already exists");
            savedFile = null;
        }
    });
    
    // Saves the file reference to the database
    // If savedFile is null
    await saveInDB(savedFile);

    return savedFile;
}


// Saves the given record in the db
const saveInDB = async (savedFile) => {
    if(savedFile != null){
        await savedFile.save((err, file) => {
            if(err){
                console.log("Attempting to save a file that already exists");
                throw err;
            }else{
                if(!file){
                    console.log("file is null");
                    
                }else{
                    console.log("File saved");
                }
            }
        });
    }
}

module.exports = {
    uploadSingle,
    uploadMultiple,
    uploadCV,
    uploadProfilePic
};
