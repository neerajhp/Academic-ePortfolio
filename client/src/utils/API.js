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

  /* ================ Authorised Calls ================ */

  getUserProfile: () => {
    return axios.get('/api/profile/', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  getCV: function () {
    return axios.get('/api/profile/cv', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  getProfilePic: function () {
    return axios.get('/api/profile/profile-pic', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  getBio: function () {
    return axios.get('/api/profile/bio', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  getEducation: function () {
    return axios.get('/api/profile/education', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  getAllFiles: function () {
    return axios.get('api/files/', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    }); // Gets an array of all Document objects that belong to the user
  },
  // So bio is supposed to come from the body, but idk how to attach it to this json
  updateBio: function (body) {
    return axios.put('/api/profile/bio', {
      biography: body.bio,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  uploadFiles: function (body) {
    return axios.post('/api/upload/files', {
      // The files key must be "document"
      files: body.files, // This is an array of files (current limit: 5 files)
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  uploadCV: function (body) {
    return axios.post('/api/upload/cv', {
      // The file key must be "cv"
      file: body.file, // This is a single file
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  uploadProfilePic: function (body) {
    return axios.post('/api/upload/profile-pic', {
      // The file key is "profile-pic"
      file: body.file,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  uploadImages: function (body) {
    return axios.post('/api/upload/images', {
      // The file key is "image"
      files: body.files, // This is an array of images (current limit: 5 files)
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets a file based on its objectID
  getFile: function () {
    return axios.get('/api/files/:id', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Deletes the file by objectID
  deleteFile: function () {
    return axios.delete('/api/files/:id', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets the user's skills array
  getSkills: function () {
    return axios.get('/api/profile/skills', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Add skills to the user's skills array (At the moment there is no limit on the number of skills)
  addSkills: function (body) {
    return axios.put('api/profile/skills', {
      skills: body.skills,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Removes specified skills from the user's skills array
  removeSkills: function (body) {
    return axios.delete('api/profile/skills', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
};
