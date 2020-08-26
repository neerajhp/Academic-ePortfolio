const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

//Point to front end
server.use(express.static('client/'));

server.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
