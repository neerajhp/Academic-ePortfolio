const Document = require("../Models/Document");
const AWS = require("aws-sdk");
const stream = require('stream')
require('dotenv').config();


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Returns all of the user's uploaded files (except profile picture and cv)
const getAllDocs = async (req, res) => {
    try{
        let documents = await findDocs(req.user.id);
        if(!documents || documents.length == 0){
            res.status(400).json("No documents found");
        }else{
            res.status(200).json(documents);
        }
        // // ideally, its probbaly better if the user_id is not from the query
        // const documents = await Document.find({user_id: req.user.id, fieldName: {$in: ["document", "image"]}});
        // res.json(documents);
    }catch(err){
        console.log(err);
        res.json({error: "Something's up"});
    }
}

// Returns all of the viewed user's uploaded files
const viewerGetAllDocs = async (req, res) => {
    try{
        let userID = req.body.userID;
        let documents = await findDocs(userID);
        if(!documents || documents.length == 0){
            res.status(400).json("No documents found");
        }else{
            res.status(200).json(documents);
        }
    }catch(err){
        console.log(err);
        res.status(400).json("Failed to retrieve");
    }
}

// Finds all of the docs belonging to the specified ID
const findDocs = async (userID) => {
    let documents;
    await Document.find({user_id: userID, fieldName: {$in: ["document", "image"]}}, (err, result) => {
        if(err){
            throw err;
        }
        if(result){
            documents = result;
        }else{
            documents = null;
        }     
    });
    return documents;
    
}

// Returns the document for download
const getDocument = async (req, res, next) => {
    await Document.findById(req.params.id, (err, doc) => {
        if(err){
            console.log(err);
            return next(err);
        }

        if(!doc){
            console.log("File not found");
            res.status(404).json({error: "File not found"});
        }else{
            // res.setHeader('Content-Type', 'image/png');
            // res.setHeader('Content-Disposition', "inline");
            res.send(doc.fileLink);
            console.log("File found");
        }
        
    })
}

// Displays a picture
const displayPicture = async (req, res, next) => {
    await Document.findOne({_id: req.params.id, fieldName: "image"}, (err, doc) => {
        if(err){
            throw err
        }
        if(doc){
            var params = {
                Bucket: "documents-eportfolio",
                Key: doc.s3_key
            }
            s3.getObject(params, (err, data) => {
                res.writeHead(200, {'Content-Type': doc.fileType});
                res.write(data.Body, 'binary');
                res.end(null, 'binary');
            })
            // s3.getObject(params)
            //     .createReadStream()
            //         .on('error', function(err){
            //             res.status(500).json({error:"Error -> " + err});
            //     }).pipe(res);
        }else{
            res.status(404).json("File not found");
        }
    });
}

// const downloadFile = async (req, res) => {
//     try{
//         await Document.findById(req.params.id, (err, doc) => {
//             if(err){
//                 throw err;
//             }
//             if(doc){
//                 var params = {
//                     Bucket: "documents-eportfolio",
//                     Key: doc.s3_key
//                 }
//                 s3.getObject(params, (err, data) => {
//                     if(err){
//                         throw err;
//                     }
//                     let objectData = data.Body.toString('utf-8');
//                     res.status(200).json(objectData);
//                 })
//             }
//         })
//     }catch(error){
//         res.status(400).json("File failed to download");
//     }
    // await Document.findById(req.params.id, (err, doc) => {
    //     if(err){
    //         throw err;
    //     }
    //     if(doc){
    //         var params = {
    //             Bucket: "documents-eportfolio",
    //             Key: doc.s3_key
    //         }
    //         s3.getObject(params, (err, data) => {
    //             if(err){
    //                 throw err;
    //             }
    //             let objectData = data.Body.toString('utf-8');
    //             res.status(200).json(objectData);
    //         })
    //     }
    // })
//}

// Deletes a document based on its objectID
const deleteDocument = async (req, res, next) => {
    await Document.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err){
            console.log("File not found");
            res.status(400).json("Document not found");
            //return(next(err));
        }

        if(!doc){
            console.log("File not found");
            res.status(404).json("File not found");
        }else{
            console.log("File record deleted");
            deleteS3Instance(doc, res);
        }
    });
}

// Deletes multiple files based on their ids
const deleteMultiple = async (req, res, next) => {
    console.log("In search of docs");
    await Document.find({
        "_id": {
            $in: req.body.IDs
        }
    }, (err, docs) => {
        if(err){
            console.log("Not found");
            res.status(400).json("Something's up");
            return next(err);
        }

        if(!docs || docs.length === 0){
            console.log("Documents not found");
            res.status(404).json("Files are not found");
        }else{
            console.log(docs);
            // Delete s3 instances
            deleteS3Multiple(docs);
            // Delete document objects
            Document.deleteMany({
                _id: {
                    $in: req.body.IDs
                }
            }, (err, result) => {
                if(err){
                    res.status(400).json(err);
                }else{
                    if(result){
                        console.log(result);
                        res.json({message: "Files have been deleted"});
                    }else{
                        console.log("Failed to delete");
                        res.status(400).json("Failed to delete files");
                    }
                    
                }
            });
        }
    });
}

// API for deleting all of a user's files
// I don't think users should be able to access this unless they want to delete their profile
const deleteAllFiles = async (req, res) => {
    try{
        let result = await clearFiles(req.user.id);
        console.log(result);
        if(result){
            console.log("Files have been deleted");
            res.status(200).json("All files have been deleted");
        }else{
            res.status(400).json("No files were found");
        }
    }catch(err){
        res.status(400).json("Files were not deleted");
    }
}

// Deletes all of the user's files (documents, images, profile picture, cv)
// If successfull it will return true
const clearFiles = async (userID) => {
    let deleteStatus;
    await Document.find({user_id: userID}, (err, docs) => {
        if(err){
            console.log("Error found");
            throw err;
        }else{
            if(docs.length === 0 || !docs){
                console.log("Files are not found");
                deleteStatus = false;
            }else{
                console.log("Files abt to be deleted");
                deleteS3Multiple(docs);
            }
        }
    });

    await Document.deleteMany({user_id: userID}, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result.deletedCount);
            if(result.deletedCount === 0){
                console.log("No delete");
                deleteStatus = false;
            }else{
                console.log("Yes delete");
                deleteStatus = true;
            }
        }
    });
    return deleteStatus;
}


// Deletes the cv of the user
const deleteCV = async (req, res) => {
    try{
        let deleteStatus = await deleteExclusiveFile(req.user.id, "cv");
        if(deleteStatus){
            res.status(200).json("CV deleted");
        }else{
            res.status(400).json("CV not deleted or there was no CV to delete");
        }
    }catch(error){
        res.status(400).json("Failed to delete cv");
    }
}

// Deletes a file with an exclusive file type (profile picture and cv)
const deleteExclusiveFile = async(userID, fieldName) => {
    let deleteStatus;
    await Document.findOne({user_id: userID, fieldName: fieldName}, (err, doc) => {
        if(err){
            console.log("Error found");
            throw err;
        }

        if(!doc){
            console.log("File not found");
        }else{
            console.log("Old file about to be deleted");
            deleteS3Instance(doc);
        }
    });

    await Document.deleteOne({user_id: userID, fieldName: fieldName}, (err, doc) => {
        if(err){
            throw err;
        }else{
            if(doc){
                if(doc.deletedCount == 0){
                    deleteStatus = false;
                }else{
                    deleteStatus = true;
                }
            }
            console.log("file reference deleted");
        }
    });
    return deleteStatus;
}

// Deletes the user's profile picture
const deleteProfilePic = async (req, res) => {
    try{
        let deleteStatus = await deleteExclusiveFile(req.user.id, "profile-pic");
        if(deleteStatus){
            res.status(200).json("Profile picture deleted");
        }else{
            res.status(400).json("Profile picture not deleted or there was no profile picture to delete");
        }
    }catch(error){
        res.status(400).json("Failed to delete profile picture");
    }


}

// Deletes the file in the s3 server
const deleteS3Instance = (doc) => {
    var params = {
        Bucket: "documents-eportfolio",
        Key: doc.s3_key
    }
    // Delete document in the s3 server
    s3.deleteObject(params, (err, data) => {
        if(err){
            console.log(err);
            console.log("error in callback");
            //res.status(400).json("Error while trying to delete the s3 instance of the record");
        }else{
            //res.status(200).json("File record and s3 instance removed");
            console.log("file removed from s3");
        }
    });
}

const deleteS3Multiple = (docs) => {
    var doc;
    var keys = [];
    // Add the s3 keys of the documents to the params
    for(doc of docs){
        keys.push({
            Key: doc.s3_key
        });
    }
    console.log(keys);

    var params = {
        Bucket: "documents-eportfolio",
        Delete: {
            Objects: keys
        }
    }

    s3.deleteObjects(params, (err, data) => {
        if(err){
            console.log(err);
            //res.status(400).json(err);
        }else{
            console.log("file removed from s3");
        }
    });


}

module.exports = {
    getAllDocs,
    viewerGetAllDocs,
    getDocument,
    displayPicture,
    //downloadFile,
    deleteDocument,
    deleteMultiple,
    deleteCV,
    deleteProfilePic,
    clearFiles,
    deleteAllFiles,
    deleteExclusiveFile
}