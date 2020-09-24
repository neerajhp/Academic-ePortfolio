const Document = require("../Models/Document");
const AWS = require("aws-sdk");
require('dotenv').config();


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Returns all of the user's documents
const getAllDocs = async (req, res) => {
    try{
        // ideally, its probbaly better if the user_id is not from the query
        const documents = await Document.find({user_id: req.user.id});
        res.json(documents);
    }catch(err){
        console.log(err);
        res.json({error: "Something's up"});
    }
}

// Returns the document for download
const getDocument = async (req, res, next) => {
    await Document.findById(req.params.id, (err, doc) => {
        if(err){
            console.log("File not found");
            return next(err);
        }

        if(!doc){
            console.log("File not found");
            res.status(404).json({error: "File not found"});
        }else{
            res.json(doc);
            console.log("File found");
        }
        
    })
}

// Deletes a document based on its objectID
const deleteDocument = async (req, res, next) => {
    await Document.findById(req.params.id, (err, doc) => {
        if(err){
            console.log("File not found");
            res.status(400).json("Document not found");
            return(next(err));
        }

        if(!doc){
            console.log("File not found");
            res.status(404).json("File not found");
            return(next());
        }else{
            deleteS3Instance(doc);
        }
    });
    
    // Delete its reference in mongoDB 
    await Document.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            res.status(400).json(err);
        }else{
            console.log("file reference deleted");
            res.json({message: "Both the file and its reference have been deleted"});
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
        }

        if(!docs){
            console.log("Documents not found");
        }else{
            deleteS3Multiple(docs, res);
        }
    });

    await Document.deleteMany({
        _id: {
            $in: req.body.IDs
        }
    }, (err, result) => {
        if(err){
            res.status(400).json(err);
        }else{
            res.json({message: "Files have been deleted"});
        }
    })
}

// API for deleting all of a user's files
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

// Deletes all of the user's files and images
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
    await Document.findOne({user_id: req.user.id, fieldName: "cv"}, (err, doc) => {
        if(err){
            console.log("Error found");
            res.status(500).json("Something's up");
        }

        if(!doc){
            console.log("CV not found");
        }else{
            console.log("Old CV about to be deleted")
            //console.log(doc);
            deleteS3Instance(doc);
            
        }
    });

     // Delete its reference in mongoDB 
     await Document.deleteOne({user_id: req.user.id, fieldName: "cv"}, (err) => {
        if(err){
            res.status(400).json(err);
        }else{
            console.log("file reference deleted");
            //res.json({message: "Both the file and its reference have been deleted"});
        }
    });
}

// Deletes the user's profile picture
const deleteProfilePic = async (req, res) => {
    await Document.findOne({user_id: req.user.id, fieldName: "profile-pic"}, (err, doc) => {
        if(err){
            console.log("Error found");
            res.status(500).json("Something's up");
        }

        if(!doc){
            console.log("Profile picture not found");
        }else{
            console.log("Old profile picture about to be deleted");
            deleteS3Instance(doc);
        }
    });

    // Delete its reference in mongoDB 
    await Document.deleteOne({user_id: req.user.id, fieldName: "profile-pic"}, (err) => {
        if(err){
            res.status(400).json(err);
        }else{
            console.log("file reference deleted");
            //res.json({message: "Both the file and its reference have been deleted"});
        }
    });


}

// Deletes the file in the s3 server
const deleteS3Instance = (doc) => {
    var params = {
        Bucket: "documents-eportfolio",
        Key: doc.s3_key
    }
    console.log(doc.s3_key);
    // Delete document in the s3 server
    s3.deleteObject(params, (err, data) => {
        if(err){
            console.log(err);
            console.log("error in callback");
        }else{
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
    getDocument,
    deleteDocument,
    deleteMultiple,
    deleteCV,
    deleteProfilePic,
    clearFiles,
    deleteAllFiles
}