const express = require('express');
const router = express.Router();

const Document = require("../Models/Document");
const {EduUni, EduHigh} = require("../Models/User.js");

const AWS = require("aws-sdk");
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});


const getCV = async (req, res) => {
    try{
        const cv = await Document.find({user_id: req.query.userID, fieldName: "cv"});
        if(cv.length == 0){
            console.log("cv not found");
            res.status(404).json({error: "CV not found"});
        }else{
            res.json(cv);
        }
    }catch(err){
        console.log(err);
        res.status(400).json({error: "Something's up"});
    }
}

const getProfilePic = async (req, res) => {
    try{
        const profilePic = await Document.find({user_id: req.query.userID, fieldName: "profile-pic"});
        if(profilePic.length == 0){
            console.log("profile picture not found");
            res.status(404).json({error: "Profile picture not found"});
        }else{
            res.json(profilePic);
        }
    }catch(err){
        console.log(err);
        res.status(400).json({error: "Something's up"});
    }
}

//Education History
const postEduUni = async(req, res) => {

    const newEduUni = new EduUni({
        //get userid from from authentication JWT
        //user_id: ,
        uniName: req.body.uniName,
        courseName: req.body.courseName,
        majorName: req.body.majorName,
        monthStart:req.body.monthStart,
        yearStart: req.body.yearStart,
        monthEnd: req.body.monthEnd,
        yearEnd: req.body.yearEnd,
        graduated: req.body.graduated,
    });

    try{
        await newEduUni.save((err, file) => {
            if(err){
                console.log("Error found");
                throw(err)
            }else{
                console.log("saved");
                res.send(file);
            }
        });
    }catch(err){
        res.status(400).json("Something's wrong");
    }

    //plan out how to edit profile and check if it already exists
}

const postEduHigh = async(req, res) => {
    const newEduHigh = new EduHigh({
        //get userid from from authentication JWT
        //user_id: ,
        highName: req.body.highName,
        monthStart:req.body.monthStart,
        yearStart: req.body.yearStart,
        monthEnd: req.body.monthEnd,
        yearEnd: req.body.yearEnd,
        graduated: req.body.graduated,
    });

    try{
        await newEduHigh.save((err, file) => {
            if(err){
                console.log("Error found");
                throw(err)
            }else{
                console.log("saved");
                res.json(file);
            }
        });
    }catch(err){
        res.status(400).json("Something's wrong");
    }
};

module.exports = {
    getCV,
    getProfilePic,
    postEduUni,
    postEduHigh
}