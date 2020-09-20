const Document = require("../Models/Document");
const multer = require("multer");
const AWS = require("aws-sdk");
require('dotenv').config();

const filesController = require("../Controllers/filesController");


// Allows the upload of a single file
const uploadSingle = async (req, res) => {
    try{
        if(req.file){
            var newFile = new Document({
                user_id: req.user.id,
                fieldName: req.file.fieldname,
                fileLink: req.file.location,
                s3_key: `user-${req.user.id}/${req.file.originalname}`
            });
            console.log(req.file.fieldname);
            //console.log(newFile);
            await Document.findOne({user_id: req.user.id, s3_key: newFile.s3_key}, (err, result) => {
                if(err){
                    res.status(400).json("something's wrong");
                }else{
                    if(result){
                        res.status(400).json("File already exists");
                    }else{
                        console.log(newFile);
                        newFile.save((err, result) => {
                            if(err){
                                throw err;
                            }else{
                                console.log("File to be saved");
                                res.status(200).json(result);
                            }
                        });
                    }
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

// Upload cv API
const uploadCV = async (req, res) => {
    await filesController.deleteCV(req, res);

    await uploadSingle(req, res);
    console.log("new cv uploaded");
}

// Upload profile picture API
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
            let existingFiles = [];
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
                            existingFiles.push(req.files[i].originalname);
                        }else{
                            newFiles.push(newFile);
                        }
                    }
                });


            }
            
            if(existingFiles.length === req.files.length){
                res.status(400).json({
                    "files": existingFiles,
                    "error": "These files already exist"
                });
                return;
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
                            res.status(200).json({
                                uploaded_files: result,
                                failed_uploads: existingFiles
                            });
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



// // Saves a reference to the uploaded file in mongoDB
// const saveFileReference = async (file, userID) => {
//     console.log("Time to save a reference");
//     // Check for file in mongoDB
//     var newFile = {
//         user_id: userID,
//         fieldName: file.fieldname,
//         fileLink: file.location,
//         s3_key: `user-${userID}/${file.originalname}`
//     }
//     let savedFile;
    
//     // Looks for the existence of a file with the same key
//     await Document.findOne({s3_key: newFile.s3_key, user_id: userID})
//     .then(async searchedFile => {
//         if(!searchedFile){
//             //savedFile = newFile;
//             var document = new Document(newFile);
//             await document.save((err, file) => {
//                 //console.log("Time to wait for document save");
//                 if(err){
//                     throw err;
//                 }else{
//                     console.log("File to be saved");
//                     savedFile = file;
//                 }
//             });
          
//         } else{
//             savedFile = null;
//             //console.log("File already exists");
//             // Make the user upload again?
//             // Rename the file?
//         }
//     });
//     //console.log(savedFile);
//     return savedFile;
// }


// // Saves the given record in the db
// const saveInDB = async (savedFile) => {
//     console.log("First step to saving");
//     if(savedFile != null){
//         await savedFile.save((err, file) => {
//             if(err){
//                 console.log("Attempting to save a file that already exists");
//                 throw err;
//             }else{
//                 if(!file){
//                     console.log("file is null");
                    
//                 }else{
//                     console.log("File saved");
//                 }
//             }
//         });
//     }else{
//         console.log("File is null");
//     }
// }

module.exports = {
    uploadSingle,
    uploadMultiple,
    uploadCV,
    uploadProfilePic
};
