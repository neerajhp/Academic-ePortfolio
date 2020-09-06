const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const cors = require("cors");
require('dotenv').config();

const server = express();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(cors);

// Import routes
const userRoute = require('./server/Routes/user');
const uploadRoute = require('./server/Routes/upload');
const filesRoute = require('./server/Routes/files');

// Attach the routes
server.use('/api/user', userRoute);
server.use('/api/upload', uploadRoute);
server.use('/api/files', filesRoute);

// Database connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  function (err) {
    if (!err) {
      console.log('Connected to mongoDB.');
    } else {
      console.log('Failed to connect to mongoDB!', err);
    }
  }
);

//Serve static files from client
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging'
) {
  server.use(express.static('client/build'));
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
