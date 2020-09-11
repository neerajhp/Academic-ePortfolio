import axios from 'axios';

export default {
  //userSignup
  userSignup: function (user) {
    return axios.post('/api/user/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  },
  userLogin: function (user) {
    return axios.post('/api/user/login', {
      email: user.email,
      password: user.password,
    });
  },
  // This gets all the information to be displayed in the profile page (firstName, lastName, email,  bio, cv, profilepic, education history) (At the moment this is it)
  // I'm not sure if this is right
  userProfile: () => {
    return axios.get("/api/profile/");
  },
  getCV: function() {
    return axios.get("/api/profile/cv");
  },
  getProfilePic: function() {
    return axios.get("/api/profile/profile-pic");
  },
  getBio: function() {
    return axios.get("/api/profile/bio");
  },
  getEducation: function() {
    return axios.get("/api/profile/education");
  },
  getAllFiles: function() {
    return axios.get("api/files/"); // Gets an array of all Document objects that belong to the user
  },
  // So bio is supposed to come from the body, but idk how to attach it to this json
  updateBio: function(body) {
    return axios.put("/api/profile/bio", {
       biography: body.bio
    });
  },
  uploadFiles: function(body) {
    return axios.post("/api/upload/files", {
      // The files key must be "document"
        files: body.files // This is an array of files (current limit: 5 files)
    });
  },
  uploadCV: function(body) {
    return axios.post("/api/upload/cv", {
      // The file key must be "cv"
        file: body.file // This is a single file
    })
  },
  uploadProfilePic: function(body){
    return axios.post("/api/upload/profile-pic", {
      // The file key is "profile-pic"
        file: body.file
    })
  },
  uploadImages: function(body){
    return axios.post("/api/upload/images", {
      // The file key is "image"
        files: body.files // This is an array of images (current limit: 5 files)
    })
  },
  // Gets a file based on its objectID (objectID is in the params)
  getFile: function(){
    return axios.get("/api/files/:id");
  },
  // Deletes the file by objectID (objectID is in the params)
  deleteFile: function(){
    return axios.delete("/api/files/:id");
  },
  



};
