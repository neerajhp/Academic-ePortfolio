const Document = require("../Models/Document");
const User = require('../Models/User');


require('dotenv').config();

const filesController = require("../Controllers/filesController");


// Allows the upload of a single file
const uploadSingle = async (req, res) => {
    try{
        if(req.file){
            var newFile = new Document({
                user_id: req.user.id,
                fieldName: req.file.fieldname,
                fileType: req.file.mimetype,
                fileLink: req.file.location,
                s3_key: `user-${req.user.id}/${req.file.originalname}`,
            });
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
    await filesController.deleteExclusiveFile(req.user.id, "cv");

    await uploadSingle(req, res);
    console.log("new cv uploaded");
}

// Upload profile picture API
const uploadProfilePic = async (req, res) => {
    await filesController.deleteExclusiveFile(req.user.id, "profile-pic");
    await uploadSingle(req, res);
    await User.findByIdAndUpdate(
        req.user.id,
        {profilePic: req.body.location},   
        { new: true },
    )
    console.log(req.file.location)
    console.log("new profile pic uploaded");
}

// Allows the upload of multiple files
const uploadMultiple = async (req, res) => {
    try{
        console.log("Attempting to upload new files")
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
                    fieldName: req.files[i].fieldname,
                    fileType: req.files[i].mimetype,
                    fileLink: req.files[i].location,
                    s3_key: `user-${req.user.id}/${req.files[i].originalname}`,
                })
                
                await Document.findOne({user_id: newFile.user_id, s3_key: newFile.s3_key}, (err, result) => {
                    if(err){
                        console.log("Couldn't find the record");
                        throw err;
                    }else{
                        // File already exists 
                        if(result){
                            existingFiles.push(req.files[i].originalname);
                        // File is newly uploaded
                        }else{
                            newFiles.push(newFile);
                        }
                    }
                });


            }
            
            // Aborts the function if there are no new files to upload
            if(existingFiles.length === req.files.length){
                res.status(400).json({
                    "files": existingFiles,
                    "error": "These files already exist"
                });
                return;
            }

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

            // // Checks whether or not files have been uploaded
            // if(newFiles.length === 0){
            //     res.status(400).json("Failed to upload files");
            // }else{
            //     await Document.insertMany(newFiles, (err, result) => {
            //         if(err){
            //             res.status(400).send(err);
            //         }else{
            //             if(result){
            //                 res.status(200).json({
            //                     uploaded_files: result,
            //                     failed_uploads: existingFiles
            //                 });
            //             }else{
            //                 res.status(400).json("Failed to upload files");
            //             }
            //         }
            //     });
            // }
        }

        
    }catch(err){
        res.status(400).send({error: "Unable to upload files."});
        console.log(err);
    }
};


module.exports = {
    uploadSingle,
    uploadMultiple,
    uploadCV,
    uploadProfilePic
};
