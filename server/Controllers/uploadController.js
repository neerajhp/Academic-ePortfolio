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
        
        if(req.files.length <= 0){
            res.status(400).send("You must select at least 1 file");
        }else{
            // Creates a document reference for each file 
        // These references are then saved to mongoDB
            let newFiles = [];
            for(var i = 0; i < req.files.length; i++){
                var newFile = new Document({
                    user_id: req.user.id,
                    fieldName: req.files[i].fieldName,
                    fileLink: req.files[i].location,
                    s3_key: `user-${req.user.id}/${req.files[i].originalname}`
                })
                
                await Document.findOne({user_id: newFile.user_id, s3_key: newFile.s3_key}, (err, result) => {
                    if(err){
                        res.status(400).send(err);
                    }else{
                        if(result){
                            res.status(400).json(`${req.files[i].originalname} already exists`);
                        }else{
                            newFiles.push(newFile);
                        }
                    }
                });


            }

            // Checks whether or not files have been uploaded
            if(newFiles.length === 0){
                res.status(400).json("Failed to upload files");
            }else{
                await Document.insertMany(newFiles, (err, result) => {
                    if(err){
                        res.status(400).send(err);
                    }else{
                        if(result){
                            res.status(200).json(result);
                        }else{
                            res.status(400).json("Failed to upload files");
                        }
                    }
                });
            }
        }

        
    }catch(err){
        res.status(400).send({error: "Unable to upload files."});
        console.log(err);
    }
};



// Saves a reference to the uploaded file in mongoDB
const saveFileReference = async (file, userID) => {
    console.log("Time to save a reference");
    // Check for file in mongoDB
    var newFile = {
        user_id: userID,
        fieldName: file.fieldname,
        fileLink: file.location,
        s3_key: `user-${userID}/${file.originalname}`
    }
    let savedFile;
    
    // Looks for the existence of a file with the same key
    await Document.findOne({s3_key: newFile.s3_key, user_id: userID})
    .then(async searchedFile => {
        if(!searchedFile){
            //savedFile = newFile;
            var document = new Document(newFile);
            await document.save((err, file) => {
                //console.log("Time to wait for document save");
                if(err){
                    throw err;
                }else{
                    console.log("File to be saved");
                    savedFile = file;
                }
            });
          
        } else{
            savedFile = null;
            //console.log("File already exists");
            // Make the user upload again?
            // Rename the file?
        }
    });
    //console.log(savedFile);
    return savedFile;
}


// Saves the given record in the db
const saveInDB = async (savedFile) => {
    console.log("First step to saving");
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
    }else{
        console.log("File is null");
    }
}

module.exports = {
    uploadSingle,
    uploadMultiple,
    uploadCV,
    uploadProfilePic
};
