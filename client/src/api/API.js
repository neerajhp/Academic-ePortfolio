import axios from 'axios';

axios.defaults.baseURL = window.location.origin;
axios.defaults.withCredentials = true;

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
    return axios.put(`/api/confirmation/reset/${token}`, {
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

  userSearch: function (searchName) {
    return axios.get('api/user/search', { params: { name: searchName } });
  },

  /* ================ Authorised Calls ================ */
  getUserInfo: () => {
    return axios.get('/api/user/userInfo');
  },

  getUserProfile: () => {
    return axios.get('/api/profile/');
  },

  getCV: function () {
    return axios.get('/api/profile/cv');
  },
  getProfilePic: function () {
    return axios.get('/api/profile/profile-pic');
  },
  getBio: function () {
    return axios.get('/api/profile/bio');
  },
  // Gets all education records
  getEducation: function () {
    return axios.get('/api/profile/education');
  },
  // Creates an education record
  postEducation: function (body) {
    return axios.post('/api/profile/education', {
      edu_type: body.edu_type,
      schoolName: body.schoolName,
      unicourseName: body.unicourseName,
      monthStart: body.monthStart,
      yearStart: body.yearStart,
      monthEnd: body.monthEnd,
      yearEnd: body.yearEnd,
      graduated: body.graduated,
    });
  },
  // Updates a specific education record
  updateEducation: function (body, recordId) {
    return axios.put(`/api/profile/education/${recordId}`, {
      edu_type: body.edu_type,
      schoolName: body.schoolName,
      unicourseName: body.unicourseName,
      unimajorName: body.unimajorName,
      monthStart: body.monthStart,
      yearStart: body.yearStart,
      monthEnd: body.monthEnd,
      yearEnd: body.yearEnd,
      graduated: body.graduated,
    });
  },
  // Deletes a specific education record
  deleteEducation: function (recordID) {
    return axios.delete(`/api/profile/education/${recordID}`);
  },
  // Delete all user education records
  clearEducation: function () {
    return axios.delete('/api/profile/education');
  },
  // Gets all of the user's uploaded files (except profile picture and cv)

  getAllFiles: function () {
    return axios.get('api/files/'); // Gets an array of all Document objects that belong to the user
  },

  // So bio is supposed to come from the body, but idk how to attach it to this json
  updateBio: function (body) {
    return axios.put('/api/profile/bio', {
      biography: body.bio,
    });
  },

  // Update tutorial boolean
  updateTutorial: function (body) {
    return axios.put('/api/user/update/tutorial');
  },
  // Single upload of file
  uploadFile: function (body) {
    return axios.post('/api/upload/file', {
      file: body.file,
    });
  },
  uploadFiles: function (body) {
    return axios.post('/api/upload/files', {
      // The files key must be "document"
      files: body.files,
    });
  },
  uploadCV: function (body) {
    return axios.post('/api/upload/cv', {
      file: body.file, // This is a single file
    });
  },
  deleteCV: function () {
    return axios.delete('/api/files/cv');
  },
  uploadProfilePic: function (body) {
    return axios.post('/api/upload/profile-pic', {
      // The file key is "profile-pic"
      file: body.file,
    });
  },
  deleteProfilePic: function () {
    return axios.delete('/api/files/profile-pic');
  },
  // Single upload of image
  uploadImage: function (body) {
    return axios.post('/api/upload/image', {
      file: body.file,
    });
  },
  // Multiple uploads of images
  uploadImages: function (body) {
    return axios.post('/api/upload/images', {
      // The file key is "image"
      files: body.files, // This is an array of images (current limit: 5 files)
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
    return axios.get(`/api/files/download/${recordID}`);
  },
  // Displays an image based on the id in the params
  displayImage: function (recordID) {
    return axios.get(`/api/files/image/${recordID}`);
  },
  // Use this if the link doesn't work (Not sure if this will work)
  // At the moment this only works for displaying the logged in user's profile picture
  displayProfilePic: function () {
    return axios.get('/api/files/image/profile-pic');
  },
  // Deletes the file by objectID
  deleteFile: function (recordID) {
    return axios.delete(`/api/files/${recordID}`);
  },
  // Deletes multiple files
  deleteFiles: function (body) {
    return axios.delete('/api/files/delete', {
      IDs: body.IDs,
    });
  },
  // Deletes all of the user's files (documents, images, profile picture and cv)
  // Its probably best if this api is only used for deleting a profile
  clearFiles: function () {
    return axios.delete('/api/files');
  },
  // Gets the user's skills array
  getSkills: function () {
    return axios.get('/api/profile/skills');
  },
  // Add skills to the user's skills array (At the moment there is no limit on the number of skills)
  addSkills: function (body) {
    return axios.put('api/profile/skills', {
      skills: body.skills,
    });
  },
  // Removes specified skills from the user's skills array
  removeSkills: function (body) {
    return axios.delete('api/profile/skills', {
      skills: body.skills,
    });
  },
  // Creates a featured work
  createFeaturedWork: function (body) {
    return axios.post('api/profile/featured-work', {
      title: body.title,
      type: body.type,
      description: body.description,
      // // attachedFile: {
      // //      documentID: "5f10kjipmd"
      // //      fileLink: "http/:www.random.com/"
      // //  }
      // attachedFile: body.attachedFile,
      image: body.image,
      url: body.url,
    });
  },
  // Gets all of the user's featured works
  getAllFeaturedWorks: function () {
    return axios.get('api/profile/featured-work');
  },
  // Gets a specific featured work
  getFeaturedWork: function (recordID) {
    return axios.get(`api/profile/featured-work/${recordID}`);
  },
  // Edit a specific featured work
  editFeaturedWork: function (body, recordID) {
    return axios.put(`api/profile/featured-work/${recordID}`, {
      title: body.title,
      type: body.type,
      description: body.description,
      //attachedFile: body.attachedFile,
      //image: body.image,
      url: body.url,
    });
  },
  // Attach a file to a featured work
  attachFilesFeaturedWork: function (body, recordID) {
    return axios.put(`api/profile/featured-work/files/${recordID}`, {
      // Idk if I'm doing this right
      files: body.files
    });
  },
  removeAttachedFilesFeaturedWork: function (body, recordID){
    return axios.delete(`api/profile/featured-work/files/${recordID}`, {
      attachedFiles: body.attachedFiles
    });
  },
  // Removes a specific featured work
  removeFeaturedWork: function (recordID) {
    return axios.delete(`api/profile/featured-work/${recordID}`);
  },
  // Removes all of the user's featured works
  clearShowCase: function () {
    return axios.delete('api/profile/featured-work');
  },
  // Gets all of the user's blog posts
  getAllBlogs: function () {
    return axios.get('api/blog');
  },

  // Gets a specific blog post
  getBlog: function (recordID) {
    return axios.get(`api/blog/${recordID}`);
  },
  // Create a new blog post
  createBlog: function (body) {
    return axios.post('api/blog', {
      title: body.title,
      dateCreated: body.dateCreated,
      content: body.content,
    });
  },
  // Edit a specific blog post
  editBlog: function (body, recordID) {
    return axios.put(`api/blog/${recordID}`, {
      title: body.title,
      dateCreated: body.dateCreated,
      content: body.content,
    });
  },
  // Add images to blog
  addBlogImages: function (body, recordID) {
    return axios.put(`api/blog/images/${recordID}`, {
      images: body.images,
    });
  },
  // Remove blog images
  removeBlogImages: function (body, recordID) {
    return axios.delete(`api/blog/images/${recordID}`, {
      images: body.images,
    });
  },
  // Removes a specific blog
  removeBlog: function (recordID) {
    return axios.delete(`api/blog/${recordID}`);
  },
  // Removes all of the user's blogs
  clearBlogs: function () {
    return axios.delete('api/blog');
  },
  // Get about me
  getAboutMe: function () {
    return axios.get('api/profile/aboutMe');
  },
  // Get tutorial
  getTutorial: function () {
    return axios.get('api/user/tutorial', {});
  },
  // Finish tutorial
  finishTutorial: function () {
    return axios.put('api/user/update/tutorial', {});
  },
  // Edit about me
  editAboutMe: function (body) {
    return axios.put('api/profile/aboutMe', {
      aboutMe: body,
    });
  },
  // Get social media
  getSocialMedia: function (body) {
    return axios.get('api/profile/social-media');
  },
  // Edit social media links
  editSocialMedia: function (body) {
    return axios.put('api/profile/social-media', {
      // e.g. [{site: "facebook", link: "www.facebook.com"}, {site: "linkedIn", link: "www.linkedIn.com"}]
      body,
    });
  },
  // Get user information
  getUserInformation: function () {
    return axios.get('api/user/userInfo');
  },
  // Edit User information (name, mobile number, birthdate)
  editUserInformation: function (body) {
    return axios.put('api/user/userInfo', {
      firstName: body.firstName,
      lastName: body.lastName,
      mobileNumber: body.mobileNumber,
      birthDate: body.birthDate,
    });
  },
  // Updates a logged in user's email
  updateEmail: function (body) {
    return axios.put('api/user/update/email', { email: body.email });
  },
  // Get user privacy option
  getPrivacy: function () {
    return axios.get('api/profile/private');
  },
  // Change user privacy
  changePrivacy: function (body) {
    return axios.put('api/profile/private', { private: body.private });
  },
  changePassword: function (body) {
    return axios.put('api/user/update/password', {
      oldPassword: body.oldPassword,
      newPassword: body.newPassword,
    });
  },
  changeUserName: function (body) {
    return axios.put('api/user/update/username', {
      userName: body.userName,
    });
  },
  // Create an experience card
  createExperience: function (body) {
    return axios.post('api/experience', {
      type: body.type,
      organization: body.organization,
      role: body.role,
      employeeStatus: body.employeeStatus,
      yearStart: body.yearStart,
      yearEnd: body.yearEnd,
      monthStart: body.monthStart,
      monthEnd: body.monthEnd,
      description: body.description,
    });
  },
  // Gets all of the user's experience (All types)
  getAllExperience: function () {
    return axios.get('api/experience');
  },
  // Gets the user's employment history
  getEmploymentHist: function () {
    return axios.get('api/experience/employment');
  },
  // Gets the user's volunteering history
  getVolunteeringHist: function () {
    return axios.get('api/experience/volunteering');
  },
  // Deletes an experience card
  deleteExperience: function (recordID) {
    return axios.delete(`api/experience/delete/${recordID}`);
  },
  // Edits a specific experience
  editExperience: function (body, recordID) {
    return axios.put(`api/experience/edit/${recordID}`, {
      type: body.type,
      organization: body.organization,
      role: body.role,
      employeeStatus: body.employeeStatus,
      yearStart: body.yearStart,
      yearEnd: body.yearEnd,
      monthStart: body.monthStart,
      monthEnd: body.monthEnd,
      description: body.description,
    });
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
    return axios.get(`/api/files/${recordID}`);
  },

  /* =========== Confirmation =========== */
  // Resends account confirmation token
  resendTokenPost: function (body) {
    return axios.post('/api/confirmation/resend', {});
  },
  // Verifies account
  confirmationPost: function (body, token) {
    return axios.post(`/api/confirmation/verify/${token}`, {
      email: body.email,
    });
  },
  // Sends reset password email
  sendResetPost: function (body, token) {
    return axios.post('/api/confirmation/reset', {
      email: body.email,
    });
  },
  // Verifies account
  resetPut: function (body, token) {
    return axios.put(`/api/confirmation/reset/${token}`, {
      password: body.password,
    });
  },
};
