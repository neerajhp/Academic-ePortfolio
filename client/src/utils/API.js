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
  // So bio is supposed to come from the body, but idk how to attach it to this json
  updateBio: function(body) {
    return axios.put("/api/profile/bio", {
       biography: body.bio
    });
  },
};
