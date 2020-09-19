const express = require('express');
const router = express.Router();

const Document = require("../Models/Document");
const User = require("../Models/User").User;
const Edu = require("../Models/User").Edu;
const FeaturedWork = require("../Models/FeaturedWork").FeaturedWork;
const filesController = require("../Controllers/filesController");
const showcaseController = require("../Controllers/showcaseController");

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

        let featuredWorks = await searchFeaturedWorks(req.user.id);
        if(featuredWorks.length === 0 || !featuredWorks){
            featuredWorks = [];
        }else{
            console.log("featured works found");
        }



        const profile = {
            firstName: userRecord.firstName,
            lastName: userRecord.lastName,
            email: userRecord.email,
            bio: userRecord.biography,
            cv: cv,
            skills: userRecord.skills,
            profilePic: profilePic,
            showcase: featuredWorks
        }

        res.json(profile);
    } catch (err) {
        console.log(err);
        console.log("user not found");
        res.status(404).send(err);
    }

}

const deleteProfile = async (req, res) => {
    try{
        // Delete all files
        let filesDeleted = await filesController.clearFiles(req.user.id);
        if(!filesDeleted){
            console.log("Failed to delete files");
            //throw new Error();
        }else{
            console.log("All files deleted");
        }
        // Delete all showcase
        let showcase = await showcaseController.removeAllFeaturedWorks(req.user.id);
        if(!showcase){
            console.log("Failed to clear showcase");
        }else{
            console.log("showcase cleared");
        }
        // Delete all Education
        // Delete all Employment
        // Delete all Reflections
        // Delete userProfile
        await User.deleteOne({
            _id: req.user.id
        }, (err, result) => {
            if(err){
                throw err;
            }else{
                if(result.deletedCount === 0){
                    throw err;
                }else{
                    console.log("User record deleted");
                }
            }
        });

        console.log("user deleted");

    }catch (err){
        console.log(err);
        res.status(400).send(err);
    }
  
}

// Looks for the user's featured works
const searchFeaturedWorks = async (userID) => {
    try{
        const works = await FeaturedWork.find({
            user_id: userID
        });
        return works;
    }catch(error){
        console.log(error);
    }
}

// Looks for the user's cv
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

// Looks for the user's profile picture
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


// API call to get the cv
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

// API call to get the profile picture
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
            getBio(req, res);
            //res.json(result);
        }
    })
}

// Add an array of skills to the user's skills array
const addSkills = async (req, res) => {
    await User.updateOne({
        _id: req.user.id
    }, {
        $addToSet: {skills: req.body.skills}
    }, (err, result) => {
        if(err){
            res.status(404).json(err);
        }else{
            if(result.nModified === 0){
                res.json("Attempted to add nothing to the skills array");
            }else{
                console.log("successfully updated");
                getSkills(req, res);
            }
        }
    })
}

// Removes the skills specified in the body from the user's skills array
const removeSkills = async (req, res) => {
   await User.updateOne({
       _id: req.user.id
   }, {
       $pull: {skills: {$in: req.body.skills}}
   }, (err, result) => {
       if(err){
           res.status(404).json(err);
       }else{
           if(result.nModified === 0){
               res.status(400).json("Skills is already empty");
           }else{
               getSkills(req, res);
           }
       }
   })
}

// API call to get the user's skills array
const getSkills = async (req, res) => {
    User.findOne({
        _id: req.user.id
    }, (err, result) => {
        if(err){
            res.status(400).json(err);
        }else{
            res.json(result.skills);
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
    updateBio,
    getSkills,
    addSkills,
    removeSkills
}