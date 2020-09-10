const Document = require("../Models/Document");
const AWS = require("aws-sdk");
require('dotenv').config();


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});


const getAllDocs = async (req, res) => {
    try{
        // ideally, its probbaly better if the user_id is not from the query
        const documents = await Document.find({user_id: req.query.userID});
        res.json(documents);
    }catch(err){
        console.log(err);
        res.json({error: "Something's up"});
    }
}

// Returns the document's link for download
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
            // var params = {
            //     Bucket: "documents-eportfolio",
            //     Key: doc.s3_key
            // }
            // s3.getObject(params, (err, data) => {
            //     if(err){
            //         console.log(err);
            //         console.log("error in callback");
            //     }else{
            //         console.log("success");
            //         res.json(doc.fileLink);
            //     }
            // })
            res.json(doc.fileLink);
            console.log("File found");
        }
        
    })
}

// Deletes a document based on its objectID
const deleteDocument = async (req, res, next) => {
    await Document.findById(req.params.id, (err, doc) => {
        if(err){
            console.log("File not found");
            return next(err);
        }

        if(!doc){
            console.log("File not found");
        }else{
            deleteS3Instance(doc);
            res.status(200).json("Object has been deleted");
            //res.json(doc.s3_key);
            //console.log("File found");
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
            console.log(data);
        }
    });
}

module.exports = {
    getAllDocs,
    getDocument,
    deleteDocument,
    deleteCV
}