const Document = require("../Models/Document");
const User = require("../Models/User");
const Edu = require("../Models/Education");
const FeaturedWork = require("../Models/FeaturedWork").FeaturedWork;

const filesController = require("../Controllers/filesController");
const showcaseController = require("../Controllers/showcaseController");
const eduController = require("../Controllers/eduController");
const blogController = require("../Controllers/blogController");

//const { ConfigurationServicePlaceholders } = require('aws-sdk/lib/config_service_placeholders');
require('dotenv').config();


const getAllInfo = async (req, res) => {
    // Get cv, profile picture, first name, last name, email, bio
    try {
        let userRecord = await User.findOne({
            _id: req.user.id
        });
        console.log("user found");
        
        let cv = await searchCV(req.user.id);
        if(!cv){
            console.log("cv not found");
            cv = "";
        }else{
            console.log("cv found");
        }
        
        let profilePic = await searchProfilePic(req.user.id);
        if(!profilePic){
            console.log("profile picture not found");
            profilePic = "";
        }else{
            console.log("profile pic found");
        }

        let featuredWorks = await searchFeaturedWorks(req.user.id);
        if(featuredWorks.length === 0 || !featuredWorks){
            console.log("featured works not found");
            featuredWorks = [];
        }else{
            console.log("featured works found");
        }

        let allEducation = await searchAllEdu(req.user.id);
        if(allEducation.length === 0 || !allEducation){
            console.log("Education not found");
            education = [];
        }else{
            console.log("Education found");
        }



        const profile = {
            firstName: userRecord.firstName,
            lastName: userRecord.lastName,
            email: userRecord.email,
            bio: userRecord.biography,
            aboutMe: userRecord.aboutMe,
            cv: cv,
            skills: userRecord.skills,
            profilePic: profilePic,
            showcase: featuredWorks,
            education: allEducation
        }

        res.json(profile);
    } catch (err) {
        console.log(err);
        console.log("user not found");
        res.status(404).send("Error while searching");
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
        let showcaseCount = await showcaseController.removeAllFeaturedWorks(req.user.id);
        if(showcaseCount > 0){
            console.log("showcase cleared");
        }else{
            console.log("Failed to clear showcase");
        }
        // Delete all Education
        let education = await eduController.clearEdu(req.user.id);
        if(!education){
            console.log("Failed to clear education history");
        }else{
            console.log("Education history cleared");
        }
        
        // Delete all Employment
        
        // Delete all Reflections
        let blogCount = await blogController.removeAllBlogs(req.user.id);
        if(blogCount > 0){
            console.log("Blogs deleted");
        }else{
            console.log("No blogs to delete");
        }
        
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

// Looks for all of the user's education
const searchAllEdu = async (userID) => {
    try{
        const edu = await Edu.find({user_id: userID});
        return edu;
    }catch(error){
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

// Biography
const getAboutMe = async (req, res) => {
    await User.findById({
        _id: req.user.id
    }, function (err, result) {
        if(err){
            res.status(404).send(err);
        }else{
            if(!result.aboutMe){
                res.status(404).json({
                    error: "about me not found"
                })
            } else {
                res.status(200).json(result.aboutMe);
            }
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

const updateAboutMe = async (req, res) => {
    // update the bio field 
    await User.updateOne({
        _id: req.user.id
    }, {
        aboutMe: req.body.aboutMe
    }, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            console.log("successfully updated");
            getAboutMe(req, res);
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
    getBio,
    updateBio,
    getAboutMe,
    updateAboutMe,
    getSkills,
    addSkills,
    removeSkills
}