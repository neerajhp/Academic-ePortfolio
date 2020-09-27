const Edu = require('../Models/Education');
// University
const postEdu = async (req, res) => {
    try {
        const newEdu = new Edu({
            edu_type: req.body.edu_type,
            user_id: req.user.id,
            schoolName: req.body.schoolName,
            unicourseName: req.body.unicourseName,
            unimajorName: req.body.unimajorName,
            country: req.body.country,
            city: req.body.city,
            monthStart: req.body.monthStart,
            yearStart: req.body.yearStart,
            monthEnd: req.body.monthEnd,
            yearEnd: req.body.yearEnd,
            graduated: req.body.graduated
        });
        await Edu.findOne({user_id: req.user.id, schoolName: newEdu.schoolName, yearStart: newEdu.yearStart, yearEnd: newEdu.yearEnd}, (err, result) => {
            if(err){
                conosle.log("Error found");
                throw err;
            }
            if(result){
                res.status(400).json("Education record already exists");
            }else{
                newEdu.save((err, file) => {
                    if (err) {
                        console.log("Error found");
                        throw (err)
                    } else {
                        console.log("saved");
                        res.status(200).json(file);
                    }
                })
            }
        });
    } catch (err) {
        res.status(400).json("Something's wrong");
    }
};

// Gets all education
const getEdu = async (req, res) => {
    try{
        await Edu.find({
            user_id: req.user.id
        }, function (err, result) {
            if(err){
                throw err;
            }
            if (!result) {
                res.status(404).json({
                    error: "education history not found"
                });
            } else {
                res.status(200).json(result);
            }
        })
    }catch(error){
        res.status(400).json("Error");
    }
};

const putEdu = async (req, res) => {
  await Edu.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.user.id,
    },
    req.body,
    function (err, result) {
      if (!result) {
        res.status(404).json({
          error: 'education history not found',
        });
      } else {
        Edu.findById(
          {
            _id: req.params.id,
          },
          function (err, updated) {
            res.status(200).json(updated);
          }
        );
      }
    }
  );
};

// Deletes a specific education record
const deleteEdu = async (req, res) => {
  console.log('id: ', req.params.id);
  await Edu.findOneAndDelete(
    {
      _id: req.params.id,
      user_id: req.user.id,
    },
    function (err, result) {
      if (!result) {
        res.status(404).json({
          error: 'education history not found',
        });
      } else {
        res.status(200).json('education history deleted');
      }
    }
  );
};

// Deletes all education API
const deleteAllEdu = async (req, res) => {
  try {
    let result = await clearEdu(req.user.id);
    console.log(result);
    if (result) {
      console.log('Files have been deleted');
      res.status(200).json('All records have been deleted');
    } else {
      res.status(400).json('No records were found');
    }
  } catch (err) {
    res.status(400).json('Records were not deleted');
  }
};

// Removes all education
const clearEdu = async (userID) => {
  let deleteStatus;
  await Edu.deleteMany({ user_id: userID }, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.deletedCount === 0) {
        console.log('Nothing to delete');
        deleteStatus = false;
      } else {
        console.log("The user's education has been cleared");
        deleteStatus = true;
      }
    }
  });
  return deleteStatus;
};

// Looks for all of the user's education
const searchAllEdu = async (userID) => {
  try {
    const edu = await Edu.find({ user_id: userID });
    return edu;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postEdu,
  getEdu,
  putEdu,
  deleteEdu,
  deleteAllEdu,
  searchAllEdu,
  clearEdu,
};
