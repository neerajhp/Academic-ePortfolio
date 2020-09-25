const Experience = require("../Models/Experience");

// Post a new experience record (Employment, volunteering, extracurricular)
const addExperience = async (req, res) => {
    try{
        const newExperience = new Experience({
            user_id: req.user.id,
            type: req.body.type,
            organization: req.body.organization,
            role: req.body.role,
            employeeStatus: req.body.employeeStatus,
            yearStart: req.body.yearStart,
            yearEnd: req.body.yearEnd,
            monthStart: req.body.monthStart,
            monthEnd: req.body.monthEnd,
            // A short paragraph or 2 abt the user's experience
            description: req.body.description
        });
    
        await Experience.findOne({user_id: req.user.id, organization: req.organization, yearStart: req.yearStart}, (err, result) => {
            if(err){
                throw err;
            }
            if(!result){
                newExperience.save((err, result) => {
                    if(err){
                        throw err;
                    }
                    if(result){
                        res.status(200).json(result);
                    }else{
                        res.status(400).json("Failed to save experience");
                    }
                });
            }
        });
    }catch(error){
        res.status(400).send("Error while trying to save new experience");
    }
}

const editExperience = async (req, res, next) => {
    try{
        await Experience.findByIdAndUpdate({_id: req.params.id}, req.body, (err, result) => {
            if(err){
                next();
                throw err;
            }
            if(result){
                console.log("Updated");
                Experience.findById({_id: req.params.id}, (err, exp) => {
                    if(err){
                        throw err;
                    }
                    res.status(200).json(exp);
                });
            }else{
                res.status(404).json("Failed to find experience");
            }
        })
    }catch(error){
        res.status(400).send("Error occured while looking for the user's experiences");
    }
}

const getAllExperience = async (req, res) => {
    try{
        await Experience.find({user_id: req.user.id}, (err, result) => {
            if(err){
                throw err;
            }
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json("The user has not uploaded any experiences");
            }
        })
    }catch(error){
        res.status(400).send("Error occured while looking for the user's experiences");
    }
}

// Gets a specific experience
const getExperience = async (req, res, next) => {
    try{
        await Experience.findById({_id: req.params.id}, (err, result) => {
            if(err){
                //next(err);
                //res.status(400).json("Error");
                throw err;
            }
            if(result){
                res.status(200).json(result);
            }else{  
                res.status(404).json("Failed to find experience");
            }
        })
    }catch(error){
        res.status(400).send("Error occured while looking for experience");
    }
}

// Deletes all of the user's experiences
const deleteAllExperience = async (req, res) => {
    try{    
        await Experience.deleteMany({user_id: req.user.id}, (err, result) => {
            if(err){
                throw err;
            }
            if(result){
                if(result.deletedCount === 0){
                    res.status(400).json("Nothing was deleted");
                }else{
                    res.status(200).json(result);
                }
            }else{  
                res.status(404).json("Failed to delete experiences");
            }
        })
    }catch(error){
        res.status(400).send("Error occured while deleting the user's experiences");
    }
}

// Deletes a specific experience
const deleteExperience = async(req, res, next) => {
    try{    
        await Experience.findByIdAndDelete({_id: req.params.id}, (err, result) => {
            if(err){
                //next();
                throw err;
            }
            if(result){
                res.status(200).json(result);
            }else{  
                res.status(404).json("Failed to delete experience");
            }
        })
    }catch(error){
        res.status(400).send("Error occured while deleting");
    }
}

// A general function for searching experience histories
const getTypeExperience = async (userID, type) => {
    let experience;
    await Experience.find({user_id: userID, type: type}, (err, result) => {
        if(err){
            throw err;
        }
        console.log("Experience found");
        experience = result;
    });
    return experience;
}

// Gets the user's employment history
const getEmploymentHistory = async (req, res) => {
    try{
        let result = await getTypeExperience(req.user.id, "Work");
        if(!result || result.length === 0){
            res.status(404).json("No Employment history found");
        }else{
            res.status(200).json(result);
        }
    }catch(error){
        res.status(400).send("Error while trying to find user's employment history");
    }
}

// Gets the user's volunteering history
const getVolunteeringHistory = async (req, res) => {
    try{
        let result = await getTypeExperience(req.user.id, "Volunteer");
        if(!result || result.length === 0){
            res.status(404).json("No Volunteering history found");
        }else{
            res.status(200).json(result);
        }
    }catch(error){
        res.status(400).send("Error while trying to find user's volunteering history");
    }
}

// Gets the user's volunteering history
const getExtracurriculars = async (req, res) => {
    try{
        let result = await getTypeExperience(req.user.id, "Extracurricular");
        if(!result || result.length === 0){
            res.status(404).json("No extracurriculars found");
        }else{
            res.status(200).json(result);
        }
    }catch(error){
        res.status(400).send("Error while trying to find user's extracurriculars");
    }
}

module.exports = {
    addExperience,
    editExperience,
    getAllExperience,
    getExperience,
    getEmploymentHistory,
    getVolunteeringHistory,
    getExtracurriculars,
    deleteAllExperience,
    deleteExperience,
}