const {
  arrayIncludes
} = require('@material-ui/pickers/_helpers/utils');
const Edu = require('../Models/Education');
const { editUserInformation } = require('./profileController');
// University
const postEdu = async (req, res) => {
  try {
    if (["University", "Highschool"].includes(req.body.edu_type)) {
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
      })

      await Edu.findOne({
        user_id: req.user.id,
        schoolName: newEdu.schoolName,
        yearStart: newEdu.yearStart,
        yearEnd: newEdu.yearEnd
      }, (err, result) => {
        if (err) {
          console.log("Error found");
          throw err;
        }
        if (result) {
          res.status(400).json("Education record already exists");
        } else {
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
    } else {
      res.status(400).json("Education type invalid")
    }
  } catch (err) {
    res.status(400).json("Something's wrong");
  }
};

// Gets all education
// const getEdu = async (req, res) => {
//   try {
//     let edu = await searchAllEdu(req.user.id);
//     if (!edu) {
//       res.status(404).json("User has no education history");
//     } else {
//       res.status(200).json(edu);
//     }
//   } catch (error) {
//     res.status(400).json("Error");
//   }
// };

const getEdu = async(req, res) => {
  try{
    await Edu.find({
      user_id: req.user.id
    }, (err, result) => {
      if(err){
        throw err;
      }
      console.log("result found");
      if(!result || result.length == 0){
        res.status(404).json("User has no education history");
      }else{
        result.sort((a, b) => parseFloat(b.yearStart) - parseFloat(a.yearStart));
        res.status(200).json(result);
  
      }
    });
  }catch(error){
    res.status(400).json("Error");
  }
}

const viewerGetEdu = async (req, res) => {
  try {
    let userID = req.viewID;
    let edu = await searchAllEdu(userID);
    if (!edu || edu.length == 0) {
      res.status(404).json("User has no education history");
    } else {
      res.status(200).json(edu);
    }
  } catch (error) {
    res.status(400).json("Failed to get user's education");
  }
}

const putEdu = async (req, res) => {
  await Edu.findOneAndUpdate({
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
        Edu.findById({
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
  await Edu.findOneAndDelete({
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
  await Edu.deleteMany({
    user_id: userID
  }, (err, result) => {
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

// Searches for all of the user's education records
const searchAllEdu = async (userID) => {
  let edu;
  await Edu.find({user_id: userID}, (err, result) => {
      if(err){
          throw err;
      }
      if(result){
          edu = result;
          edu.sort((a, b) => parseFloat(b.yearStart) - parseFloat(a.yearStart));
      }else{
          edu = null;
      }
  });
  return edu;
}

module.exports = {
  postEdu,
  getEdu,
  viewerGetEdu,
  putEdu,
  deleteEdu,
  deleteAllEdu,
  searchAllEdu,
  clearEdu,
};