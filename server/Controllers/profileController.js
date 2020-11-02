const Document = require('../Models/Document');
const User = require('../Models/User');
const FeaturedWork = require('../Models/FeaturedWork').FeaturedWork;

const filesController = require('../Controllers/filesController');
const showcaseController = require('../Controllers/showcaseController');
const eduController = require('../Controllers/eduController');
const blogController = require('../Controllers/blogController');
const expController = require('../Controllers/experienceController');
//const { AccountTreeSharp } = require('@material-ui/icons');

//const { ConfigurationServicePlaceholders } = require('aws-sdk/lib/config_service_placeholders');
require('dotenv').config();

const getAllInfo = async (userID) => {
  // Get cv, featuredWorks, blogs, education, skills, profile picture

  try {
    let userRecord;
    await User.findOne(
      {
        _id: userID,
      },
      (err, result) => {
        if (err) {
          throw err;
        } else {
          userRecord = result;
        }
      }
    );

    let cv = await searchCV(userID);
    if (!cv) {
      console.log('cv not found');
      cv = '';
    } else {
      console.log('cv found');
    }

    let profilePic = await searchProfilePic(userID);
    if (!profilePic) {
      console.log('profile picture not found');
      profilePic = '';
    } else {
      console.log('profile pic found');
    }

    let allEducation = await eduController.searchAllEdu(userID);
    if (!allEducation || allEducation.length === 0) {
      console.log('Education not found');
      allEducation = [];
    } else {
      console.log('Education found');
    }

    let allExperience = await expController.findAll(userID);
    if (!allExperience || allExperience.length === 0) {
      console.log('Experience not found');
      allExperience = [];
    } else {
      console.log('Experience found');
    }

    let featuredWorks = await searchFeaturedWorks(userID);
    if (!featuredWorks || featuredWorks.length === 0) {
      console.log('featured works not found');
      featuredWorks = [];
    } else {
      console.log('featured works found');
    }

    const profile = {
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      userName: userRecord.userName,
      email: userRecord.email,
      bio: userRecord.biography,
      aboutMe: userRecord.aboutMe,
      socialMedia: userRecord.socialMedia,
      cv: cv,
      skills: userRecord.skills,
      profilePic: profilePic,
      showcase: featuredWorks,
      education: allEducation,
      experience: allExperience,
      tutorial: userRecord.tutorial,
    };

    return profile;
  } catch (error) {
    console.log(error);
  }
};

// Gets the viewed user's profile
const viewerGetProfile = async (req, res) => {
  try {
    let userID = req.viewID;
    // console.log(req);
    let profile = await getAllInfo(userID);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(400).json('No profile found');
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// Gets the user's profile
const getProfile = async (req, res) => {
  try {
    let profile = getAllInfo(req.user.id);
    profile.then(async (result) => {
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).json('No profile found');
      }
    })
  } catch (error) {
    res.status(400).json(error);
  }
};

// Deletes all of the user's uploaded files and created records
// Also deletes the user record at the end
const deleteProfile = async (req, res) => {
  try {
    // Delete all showcase
    let showcaseCount = await showcaseController.removeAllFeaturedWorks(
      req.user.id
    );
    if (showcaseCount > 0) {
      console.log('showcase cleared');
    } else {
      console.log('Failed to clear showcase');
    }
    // Delete all Education
    let education = await eduController.clearEdu(req.user.id);
    if (!education) {
      console.log('Failed to clear education history');
    } else {
      console.log('Education history cleared');
    }

    // Delete all Experiences
    let expDelete = await expController.removeAll(req.user.id);
    if (!expDelete) {
      console.log('Failed to clear experience');
    } else {
      console.log('Experience cleared');
    }
    // Delete all Reflections
    let blogCount = await blogController.removeAllBlogs(req.user.id);
    if (blogCount > 0) {
      console.log('Blogs deleted');
    } else {
      console.log('No blogs to delete');
    }

    // Delete all files
    let filesDeleted = await filesController.clearFiles(req.user.id);
    if (!filesDeleted) {
      console.log('Failed to delete files');
      //throw new Error();
    } else {
      console.log('All files deleted');
    }

    // Delete userProfile
    await User.deleteOne(
      {
        _id: req.user.id,
      },
      (err, result) => {
        console.log('About to delete user');
        if (err) {
          throw err;
        } else {
          if (result.deletedCount === 0) {
            throw err;
          } else {
            console.log('User record deleted');
          }
        }
      }
    );

    res.status(200).json('User deleted');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Looks for the user's featured works
const searchFeaturedWorks = async (userID) => {
  try {
    const works = await FeaturedWork.find({
      user_id: userID,
    });
    return works;
  } catch (error) {
    console.log(error);
  }
};

// Looks for the user's cv
const searchCV = async (userID) => {
  try {
    const cv = await Document.findOne({
      user_id: userID,
      fieldName: 'cv',
    });
    return cv;
  } catch (error) {
    console.log(error);
  }
};

// Looks for the user's profile picture
const searchProfilePic = async (userID) => {
  try {
    const profilePic = await Document.findOne({
      user_id: userID,
      fieldName: 'profile-pic',
    });
    return profilePic;
  } catch (error) {
    console.log(error);
  }
};

// API call to get the cv
const getCV = async (req, res) => {
  try {
    await Document.findOne(
      { user_id: req.user.id, fieldName: 'cv' },
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json('CV not found');
        }
      }
    );
    // const cv = await searchCV(req.user.id);
    // if (!cv) {
    //     console.log("cv not found");
    //     res.status(404).json({
    //         error: "CV not found"
    //     });
    // } else {
    //     res.json(cv);
    // }
  } catch (err) {
    console.log(err);
    res.status(400).json('Error while looking for cv');
  }
};

// API call to get the profile picture
const getProfilePic = async (req, res) => {
  try {
    await Document.findOne(
      {
        user_id: req.user.id,
        fieldName: 'profile-pic',
      },
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json('Profile picture not found');
        }
      }
    );
    // const profilePic = await searchProfilePic(req.user.id);
    // if (!profilePic) {
    //     // Maybe return a generic profile picture instead
    //     console.log("profile picture not found");
    //     res.status(404).json({
    //         error: "Profile picture not found"
    //     });
    // } else {
    //     res.json(profilePic);
    // }
  } catch (err) {
    console.log(err);
    res.status(400).json("Something's up");
  }
};

// Biography
const getBio = async (req, res) => {
  try {
    await User.findById(
      {
        _id: req.user.id,
      },
      function (err, result) {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).json(result.biography);
        } else {
          res.status(404).json('biography not found');
        }
      }
    );
  } catch (error) {
    res.status(400).json('Error while trying to get bio');
  }
};

// Biography
const getAboutMe = async (req, res) => {
  await User.findById(
    {
      _id: req.user.id,
    },
    function (err, result) {
      if (err) {
        res.status(404).json(err);
      } else {
        if (result) {
          res.status(200).json(result.aboutMe);
        } else {
          res.status(404).json('Not found');
        }
      }
    }
  );
};

// Update the user's bio (The short sentence under the user's name)
const updateBio = async (req, res) => {
  // update the bio field
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        biography: req.body.biography,
      },
      (err, result) => {
        if (err) {
          res.status(403).json(err);
        } else {
          if (!result) {
            res.status(404).json('User not found');
          } else {
            User.findById(req.user.id, function (err, updated) {
              console.log(updated.biography);
              res.status(200).json(updated.biography);
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(400).json("Error while trying to update the user's bio");
  }
};

const updateAboutMe = async (req, res) => {
  try {
    await User.updateOne(
      {
        _id: req.user.id,
      },
      {
        aboutMe: req.body.aboutMe,
      },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          console.log('successfully updated');
          getAboutMe(req, res);
          //res.json(result);
        }
      }
    );
  } catch (error) {
    res.status(400).json('Failed to update about me');
  }
};

// Add an array of skills to the user's skills array
const addSkills = async (req, res) => {
  try {
    if (req.body.skills.includes('') || req.body.skills.length == 0) {
      res.status(400).json('Attempted to add nothing into skills');
    } else {
      await User.updateOne(
        {
          _id: req.user.id,
        },
        {
          $addToSet: { skills: req.body.skills },
        },
        (err, result) => {
          if (err) {
            res.status(404).json(err);
          } else {
            if (!result) {
              res.status(400).json('Attempted to add nothing');
            } else {
              getSkills(req, res);
            }
            // if(!result || result.nModified === 0){
            //     res.status(400).json("Attempted to add nothing or a duplicate skill to the skills array");
            // }else{
            //     console.log("successfully updated");
            //     // User.findById({_id: req.user.id}, (err, result) => {
            //     //     if(result){
            //     //         res.status(200).json(result.skills);
            //     //     }else{
            //     //         res.status(404).json("No user found");
            //     //     }
            //     // })
            //     getSkills(req, res);
            // }
          }
        }
      );
    }
  } catch (error) {
    res.status(400).json('Error while trying to add skill');
  }
};

// Removes the skills specified in the body from the user's skills array
const removeSkills = async (req, res) => {
  await User.updateOne(
    {
      _id: req.user.id,
    },
    {
      $pull: { skills: { $in: req.body.skills } },
    },
    (err, result) => {
      if (err) {
        res.status(404).json(err);
      } else {
        getSkills(req, res);
        //    if(result.nModified === 0){
        //        res.status(400).json("Skills is already empty");
        //    }else{
        //        getSkills(req, res);
        //    }
      }
    }
  );
};

// API call to get the user's skills array
const getSkills = async (req, res) => {
  User.findOne(
    {
      _id: req.user.id,
    },
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result.skills);
      }
    }
  );
};

// Add available social media links to the user model
const addSocialMedia = async (req, res) => {
  try {
    await User.findById(req.user.id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        // const links = createSocialMediaJSON(req.body, result.socialMedia);
        console.log(req.body);
        User.findByIdAndUpdate(
          req.user.id,
          { socialMedia: req.body },
          { new: true },
          (err, result) => {
            if (err) {
              throw err;
            }
            if (result) {
              res.status(200).json(result.socialMedia);
            } else {
              res.status(400).json('Failed to find and update the user');
            }
          }
        );
      } else {
        res.status(404).json('User not found');
      }
    });
  } catch (error) {
    res.status(400).json("Failed to update the user's social media links");
  }
};

// Get the social media field in the user object
const getSocialMedia = async (req, res) => {
  try {
    await User.findById(req.user.id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.status(200).json(result.socialMedia);
      } else {
        res.status(404).json('User not found');
      }
    });
  } catch (error) {
    res.status(400).json('Error while trying to get user');
  }
};


// Change the privacy setting
const changePrivacy = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      { private: req.body.private },
      { new: true },
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          console.log('Change privacy value');
          res.status(200).json(result.private);
        } else {
          res.status(404).json('Failed to find user record');
        }
      }
    );
  } catch (error) {
    res.status(400).json('Failed to change privacy value');
  }
};

const getPrivacy = async (req, res) => {
  try {
    await User.findById(req.user.id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        console.log('Send privacy value');
        res.status(200).json(result.private);
      } else {
        res.status(404).json('Failed to find user record');
      }
    });
  } catch (error) {
    res.status(400).json('Failed to get privacy value');
  }
};

module.exports = {
  getProfile,
  viewerGetProfile,
  getCV,
  getProfilePic,
  getBio,
  updateBio,
  getAboutMe,
  updateAboutMe,
  getSkills,
  addSkills,
  removeSkills,
  deleteProfile,
  getSocialMedia,
  addSocialMedia,
  changePrivacy,
  getPrivacy,
};
