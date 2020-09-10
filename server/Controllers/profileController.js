const express = require('express');
const router = express.Router();

const Document = require("../Models/Document");
const User = require("../Models/User").User;
const Edu = require("../Models/User").Edu;

const AWS = require("aws-sdk");
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

const getAllInfo = async (req, res) => {
    // Get cv, profile picture, first name, last name, email, bio
    try {
        const userRecord = await User.findOne({
            _id: req.user.id
        });
        console.log("user found");
        let cv = await searchCV(req.user.id);
        if(!cv){
            cv = "";
        }else{
            console.log("cv found");
        }
        
        let profilePic = await searchProfilePic(req.user.id);
        if(!profilePic){
            profilePic = "";
        }else{
            console.log("profile pic found");
        }

        const profile = {
            firstName: userRecord.firstName,
            lastName: userRecord.lastName,
            email: userRecord.email,
            bio: userRecord.biography,
            cv: cv,
            profilePic: profilePic
        }

        res.json(profile);
    } catch (err) {
        console.log(err);
        console.log("user not found");
        res.status(404).json(err);
    }

}



const searchCV = async (userID) => {
    try {
        const cv = await Document.findOne({
            user_id: userID,
            fieldName: "cv"
        });
        return cv;

    } catch (error) {
        console.log(error);
    }
}

const searchProfilePic = async (userID) => {
    try {
        const profilePic = await Document.findOne({
            user_id: userID,
            fieldName: "profile-pic"
        });
        return profilePic;
    } catch (error) {
        console.log(error);
    }
}



const getCV = async (req, res) => {
    try {
        const cv = await searchCV(req.user.id);
        if (!cv) {
            console.log("cv not found");
            res.status(404).json({
                error: "CV not found"
            });
        } else {
            res.json(cv);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error: "Something's up"
        });
    }
}

const getProfilePic = async (req, res) => {
    try {
        const profilePic = await searchProfilePic(req.user.id);
        if (!profilePic) {
            // Maybe return a generic profile picture instead
            console.log("profile picture not found");
            res.status(404).json({
                error: "Profile picture not found"
            });
        } else {
            res.json(profilePic);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error: "Something's up"
        });
    }
}

// University 
const postEdu = async (req, res) => {
    const newEdu = new Edu({
        edu_type: req.body.edu_type,
        user_id: req.user.id,
        highName: req.body.highName,
        uniName: req.body.uniName,
        unicourseName: req.body.unicourseName,
        unimajorName: req.body.unimajorName,
        monthStart: req.body.monthStart,
        yearStart: req.body.yearStart,
        monthEnd: req.body.monthEnd,
        yearEnd: req.body.yearEnd,
        graduated: req.body.graduated
    });

    try {
        await newEdu.save((err, file) => {
            if (err) {
                console.log("Error found");
                throw (err)
            } else {
                console.log("saved");
                res.send(file);
            }
        });
    } catch (err) {
        res.status(400).json("Something's wrong");
    }
};

const getEdu = async (req, res) => {
    await Edu.find({
        user_id: req.user.id
    }, function (err, result) {
        if (!result) {
            res.status(404).json({
                error: "education history not found"
            });
        } else {
            res.status(200).json(result);
        }
    })
};

const putEdu = async (req, res) => {

    await Edu.findOneAndUpdate({
        _id: req.body._id,
        user_id: req.user.id
    }, req.body, function (err, result) {
        if (!result) {
            res.status(404).json({
                error: "education history not found"
            });
        } else {
            EduUni.findById({
                _id: req.body._id
            }, function (err, updated) {
                res.status(200).json(updated);
            })
        }
    })


};

const deleteEdu = async (req, res) => {

    await Edu.findOneAndDelete({
        _id: req.body._id,
        user_id: req.user.id
    }, function (err, result) {
        if (!result) {
            res.status(404).json({
                error: "education history not found"
            });
        } else {
            res.status(200).json("education history deleted");
        }
    })

};


// Biography
const getBio = async (req, res) => {
    await User.findById({
        _id: req.user.id
    }, function (err, result) {
        if(!result.biography){
            res.status(404).json({
                error: "biography not found"
            })
        } else {
            res.status(200).json(result.biography)
        }
    })
}

const updateBio = async (req, res) => {
    // update the bio field 
    await User.updateOne({
        _id: req.user.id
    }, {
        biography: req.body.biography
    }, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            console.log("successfully updated");
            User.findOne({
                _id: req.user.id
            }, (err, result) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.json(result.biography);
                }
                //res.json(result);
            })
            //res.json(result);
        }
    })
}

module.exports = {
    getAllInfo,
    getCV,
    getProfilePic,
    postEdu,
    getEdu,
    putEdu,
    deleteEdu,
    getBio,
    updateBio
}