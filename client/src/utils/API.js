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
  // Gets all education records
  getEducation: function () {
    return axios.get('/api/profile/education', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Creates an education record
  postEducation: function (body) {
    console.log(body.edu_type);
    return axios.post(
      '/api/profile/education',
      {
        edu_type: body.edu_type,
        schoolName: body.schoolName,
        unicourseName: body.unicourseName,
        monthStart: body.monthStart,
        yearStart: body.yearStart,
        monthEnd: body.monthEnd,
        yearEnd: body.yearEnd,
        graduated: body.graduated,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Updates a specific education record
  updateEducation: function (body, recordId) {
    return axios.put(
      `/api/profile/education/${recordId}`,
      {
        edu_type: body.edu_type,
        schoolName: body.schoolName,
        unicourseName: body.unicourseName,
        unimajorName: body.unimajorName,
        monthStart: body.monthStart,
        yearStart: body.yearStart,
        monthEnd: body.monthEnd,
        yearEnd: body.yearEnd,
        graduated: body.graduated,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Deletes a specific education record
  deleteEducation: function (recordID) {
    return axios.delete(`/api/profile/education/${recordID}`, {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Delete all user education records
  clearEducation: function () {
    return axios.delete('/api/profile/education', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets all of the user's uploaded files (except profile picture and cv)
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
  // Deletes multiple files
  deleteFiles: function (body) {
    return axios.delete('/api/files/delete', {
      IDs: body.IDs,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Deletes all of the user's files (documents, images, profile picture and cv)
  // Its probably best if this api is only used for deleting a profile
  clearFiles: function () {
    return axios.delete('/api/files', {
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
      skills: body.skills,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Creates a featured work
  createFeaturedWork: function (body) {
    return axios.post('api/profile/featured-work', {
      title: body.title,
      type: body.type,
      description: body.description,
      // attachedFile: {
      //      documentID: "5f10kjipmd"
      //      fileLink: "http/:www.random.com/"
      //  }
      attachedFile: body.attachedFile,
      image: body.image,
      url: body.url,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets all of the user's featured works
  getAllFeaturedWorks: function () {
    return axios.get('api/profile/featured-work', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets a specific featured work
  getFeaturedWork: function () {
    return axios.get('api/profile/featured-work/:id', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Edit a specific featured work
  editFeaturedWork: function (body) {
    return axios.put('api/profile/featured-work/:id', {
      title: body.title,
      type: body.type,
      description: body.description,
      attachedFile: body.attachedFile,
      image: body.image,
      url: body.url,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Removes a specific featured work
  removeFeaturedWork: function () {
    return axios.delete('api/profile/featured-work/:id', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Removes all of the user's featured works
  clearShowCase: function () {
    return axios.delete('api/profile/featured-work', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets all of the user's blog posts
  getAllBlogs: function () {
    return axios.get('api/blog', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets a specific blog post
  getBlog: function () {
    return axios.get('api/blog/:id', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Create a new blog post
  createBlog: function (body) {
    return axios.post('api/blog', {
      title: body.title,
      dateCreated: body.dateCreated,
      content: body.content,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Edit a specific blog post
  editBlog: function (body) {
    return axios.put('api/blog/:id', {
      title: body.title,
      dateCreated: body.dateCreated,
      content: body.content,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Removes a specific blog
  removeBlog: function () {
    return axios.delete('api/blog/:id', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Removes all of the user's blogs
  clearBlogs: function () {
    return axios.delete('api/blog', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Get about me
  getAboutMe: function () {
    return axios.get('api/profile/aboutMe', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Edit about me
  editAboutMe: function (body) {
    return axios.put('api/profile/aboutMe', {
      aboutMe: body.aboutMe,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Get user information
  getUserInformation: function () {
    return axios.get('api/user/userInfo', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Edit User information
  // At the moment the user cannot change their email and password using this api
  editUserInformation: function (body) {
    return axios.put('api/user/userInfo', {
      firstName: body.firstName,
      lastName: body.lastName,
      mobileNumber: body.mobileNumber,
      birthDate: body.birthDate,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
};
