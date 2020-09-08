const express = require('express');
const router = express.Router();

const Document = require("../Models/Document");
const User = require("../Models/User").User;
const {
    EduUni,
    EduHigh
} = require("../Models/User.js");

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
            dummyID: req.query.userID
        });
        console.log("user found");
        const cv = await searchCV(req.query.userID);
        console.log("cv found");
        const profilePic = await searchProfilePic(req.query.userID);
        console.log("profile pic found");

        const profile = {
            firstName: userRecord.firstName,
            lastName: userRecord.lastName,
            email: userRecord.email,
            bio: userRecord.biography,
            cv: cv.fileLink,
            profilePic: profilePic.fileLink
        }

        res.json(profile);
    } catch (err) {
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
        const cv = await searchCV(req.query.userID);
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
        const profilePic = await searchProfilePic(req.query.userID);
        if (!profilePic) {
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


// Education History //
const getEduAll = async (req, res) => {
    try {
        eduhigh = await getEduHigh
        eduuni = await getEduUni

        const eduhistory = {
            EduHigh: eduhigh,
            EduUni: eduuni
        }

        res.json(eduhistory);
    } catch (err) {
        console.log("education history not found");
        res.status(404).json(err);
    }
            
};

// University 
const postEduUni = async (req, res) => {

    const newEduUni = new EduUni({
        //get userid from from authentication JWT
        //user_id: ,
        uniName: req.body.uniName,
        courseName: req.body.courseName,
        majorName: req.body.majorName,
        monthStart: req.body.monthStart,
        yearStart: req.body.yearStart,
        monthEnd: req.body.monthEnd,
        yearEnd: req.body.yearEnd,
        graduated: req.body.graduated,
    });

    try {
        await newEduUni.save((err, file) => {
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
    //Check if the record already exists for the user
};

const getEduUni = async (req, res) => {
    await EduUni.findById({
        _id: req.body._id
    }, function(err, result) {
            if (err) {
                res.status(404).json({
                    error: "education history not found"
                });
            } else {
                res.status(200).json(result);
            }
        })
};

// Update works, check if error checking function is working working !!!!!!!!!!!
const putEduUni = async (req, res) => {

    await EduUni.findByIdAndUpdate({
        _id: req.body._id
    }, req.body, function(err, result) {
            if (err) {
                res.status(404).json({
                    error: "education history not found"
                });
            } else {
                res.status(200).json(result);
            }
        })

    
};

// Delete works, Error checking not working !!!!!!!!!!! error is null
const deleteEduUni = async (req, res) => {

    await EduUni.findByIdAndDelete({
        _id: req.body._id
    }, function(err, result) {
            console.log(err);
            console.log(result);
            if (err) {
                res.status(404).json({
                    error: "education history not found"
                });
            } else {
                res.status(200).json(result);
            }
        })

};


// Highschool
const postEduHigh = async (req, res) => {
    const newEduHigh = new EduHigh({
        //get userid from from authentication JWT
        //user_id:
        highName: req.body.highName,
        monthStart: req.body.monthStart,
        yearStart: req.body.yearStart,
        monthEnd: req.body.monthEnd,
        yearEnd: req.body.yearEnd,
        graduated: req.body.graduated,
    });

    try {
        await newEduHigh.save((err, file) => {
            if (err) {
                console.log("Error found");
                throw (err)
            } else {
                console.log("saved");
                res.json(file);
            }
        });
    } catch (err) {
        res.status(400).json("Something's wrong");
    }
    //Check if the record already exists for the user
};

const getEduHigh = async (req, res) => {
    await EduHigh.findById({
        _id: req.body._id
    }, function(err, result) {
            if (err) {
                res.status(404).json({
                    error: "education history not found"
                });
            } else {
                res.status(200).json(result);
            }
        })
};

const putEduHigh = async (req, res) => {

    await EduHigh.findByIdAndUpdate({
        _id: req.body._id
    }, req.body, function(err, result) {
            if (err) {
                res.status(404).json({
                    error: "education history not found"
                });
            } else {
                res.status(200).json(result);
            }
        })

    
};

const deleteEduHigh = async (req, res) => {

    await EduHigh.findByIdAndDelete({
        _id: req.body._id
    }, function(err, result) {
            console.log(err);
            console.log(result);
            if (err) {
                res.status(404).json({
                    error: "education history not found"
                });
            } else {
                res.status(200).json(result);
            }
        })

};

// Biography
const updateBio = async (req, res) => {
    // update the bio field 
    await User.updateOne({
        _id: req.query.userID
    }, {
        biography: req.body.bio
    }, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            console.log("successfully updated");
            User.findOne({
                _id: req.query.userID
            }, (err, result) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.json(result.bio);
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
    postEduUni,
    getEduUni,
    putEduUni,
    deleteEduUni,
    postEduHigh,
    getEduHigh,
    putEduHigh,
    deleteEduHigh,
    updateBio
}