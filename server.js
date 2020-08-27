const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const server = express();

// Used to parse the request body
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Import routes
const userRoute = require('./server/Routes/user.js');

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB!')
);

// Assign routes
server.use('/user', userRoute);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
