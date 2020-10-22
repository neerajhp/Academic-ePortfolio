import axios from 'axios';

axios.defaults.baseURL = window.location.origin;

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

  resendToken: function (userEmail) {
    return axios.post('/api/confirmation/resend', {
      email: userEmail,
    });
  },
  emailVerified: function (token, userEmail) {
    return axios.post(`/api/confirmation/verify/${token}`, {
      email: userEmail,
    });
  },
  emailresetPassword: function (userEmail) {
    return axios.post('/api/confirmation/reset', {
      email: userEmail,
    });
  },
  resetPassword: function (token, userPassword) {
    return axios.post(`/api/confirmation/reset/${token}`, {
      password: userPassword,
    });
  },
  userLogin: function (user) {
    return axios.post('/api/user/login', {
      email: user.email,
      password: user.password,
    });
  },

  googleLogin: function (idToken) {
    return axios.post(`api/user/googleLogin`, {
      idToken: idToken,
    });
  },

  facebookLogin: function (userID, accessToken) {
    return axios.post('api/user/facebooklogin', {
      userID,
      accessToken,
    });
  },

  /* ================ Authorised Calls ================ */
  getUserInfo: () => {
    return axios.get('/api/user/userInfo', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },

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
    return axios.put(
      '/api/profile/bio',
      {
        biography: body.bio,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Single upload of file
  uploadFile: function (body) {
    return axios.post('/api/upload/file', {
      file: body.file,
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
  deleteCV: function () {
    return axios.delete('/api/files/cv', {
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
  deleteProfilePic: function () {
    return axios.delete('/api/files/profile-pic', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Single upload of image
  uploadImage: function (body) {
    return axios.post('/api/upload/image', {
      file: body.file,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Multiple uploads of images
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
  // getFile: function () {
  //   return axios.get('/api/files/:id', {
  //     headers: {
  //       Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
  //     },
  //   });
  // },
  // Downloads a file
  downloadFile: function (recordID) {
    return axios.get(`/api/files/download/${recordID}`, {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Displays an image based on the id in the params
  displayImage: function (recordID) {
    return axios.get(`/api/files/image/${recordID}`, {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Use this if the link doesn't work (Not sure if this will work)
  // At the moment this only works for displaying the logged in user's profile picture
  displayProfilePic: function () {
    return axios.get('/api/files/image/profile-pic', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Deletes the file by objectID
  deleteFile: function (recordID) {
    return axios.delete(`/api/files/${recordID}`, {
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
  getFeaturedWork: function (recordID) {
    return axios.get(`api/profile/featured-work/${recordID}`, {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Edit a specific featured work
  editFeaturedWork: function (body, recordID) {
    return axios.put(
      `api/profile/featured-work/${recordID}`,
      {
        title: body.title,
        type: body.type,
        description: body.description,
        attachedFile: body.attachedFile,
        image: body.image,
        url: body.url,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Removes a specific featured work
  removeFeaturedWork: function (recordID) {
    return axios.delete(`api/profile/featured-work/${recordID}`, {
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
  getBlog: function (recordID) {
    return axios.get(`api/blog/${recordID}`, {
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
  editBlog: function (body, recordID) {
    return axios.put(
      `api/blog/${recordID}`,
      {
        title: body.title,
        dateCreated: body.dateCreated,
        content: body.content,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Removes a specific blog
  removeBlog: function (recordID) {
    return axios.delete(`api/blog/${recordID}`, {
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
    return axios.put(
      'api/profile/aboutMe',
      {
        aboutMe: body,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Get user information
  getUserInformation: function () {
    return axios.get('api/user/userInfo', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Edit User information (name, mobile number, birthdate)
  editUserInformation: function (body) {
    return axios.put(
      'api/user/userInfo',
      {
        firstName: body.firstName,
        lastName: body.lastName,
        mobileNumber: body.mobileNumber,
        birthDate: body.birthDate,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Updates a logged in user's email
  updateEmail: function (body) {
    return axios.put(
      'api/user/update/email',
      { email: body.email },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  changePassword: function (body) {
    return axios.put(
      'api/user/update/password',
      { oldPassword: body.oldPassword, newPassword: body.newPassword },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  changeUserName: function (body) {
    return axios.put(
      'api/user/update/username',
      {
        userName: body.userName,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Create an experience card
  createExperience: function (body) {
    return axios.post(
      'api/experience',
      {
        type: body.type,
        organization: body.organization,
        role: body.role,
        employeeStatus: body.employeeStatus,
        yearStart: body.yearStart,
        yearEnd: body.yearEnd,
        monthStart: body.monthStart,
        monthEnd: body.monthEnd,
        description: body.description,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },
  // Gets all of the user's experience (All types)
  getAllExperience: function () {
    return axios.get('api/experience', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets all of the viewed profile's experience
  viewGetAllExperience: function (body) {
    return axios.get('api/view/experience', {
      userID: body.userID,
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets the user's employment history
  getEmploymentHist: function () {
    return axios.get('api/experience/employment', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Gets the user's volunteering history
  getVolunteeringHist: function () {
    return axios.get('api/experience/volunteering', {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Deletes an experience card
  deleteExperience: function (recordID) {
    return axios.delete(`api/experience/delete/${recordID}`, {
      headers: {
        Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
  // Edits a specific experience
  editExperience: function (body, recordID) {
    return axios.put(
      `api/experience/edit/${recordID}`,
      {
        type: body.type,
        organization: body.organization,
        role: body.role,
        employeeStatus: body.employeeStatus,
        yearStart: body.yearStart,
        yearEnd: body.yearEnd,
        monthStart: body.monthStart,
        monthEnd: body.monthEnd,
        description: body.description,
      },
      {
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
      }
    );
  },

  /* =========== Viewer =========== */
  // Gets all the profile of the viewed person
  viewerGetProfile: function (userName) {
    return axios.get(`api/view/profile/${userName}`, {});
  },

  // Gets all the blogs of the viewed person
  viewerGetAllBlogs: function (userName) {
    return axios.get(`api/view/blog/${userName}`, {});
  },

  // Gets all the experience of the viewed person
  viewerGetAllExperience: function (userName) {
    return axios.get(`api/view/experience/${userName}`, {});
  },

  // Gets all the education of the viewed person
  viewerGetEdu: function (userName) {
    return axios.get(`api/view/education/${userName}`, {});
  },

  // Gets all the featured-works of the viewed person
  viewerGetFeaturedWorks: function (userName) {
    return axios.get(`api/view/featured-work/${userName}`, {});
  },

  // Gets all the documents of the viewed person
  viewerGetAllDocs: function (userName) {
    return axios.get(`api/view/files/${userName}`, {});
  },

  // Gets user information of the viewed person
  viewerGetUserInformation: function (userName) {
    return axios.get(`api/view/userInfo/${userName}`, {});
  },

  //Get a file based on its objectID
  getFile: function (recordID) {
    return axios.get(`/api/files/${recordID}`, {
      headers: {
        Authorization: 'Bearer:' + JSON.parse(localStorage.getItem('token')),
      },
    });
  },
};
