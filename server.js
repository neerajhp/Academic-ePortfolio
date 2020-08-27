const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
require('dotenv').config();

const server = express();

// Middlewares
server.use(express.json());
// server.use(cors);

// Import routes and put them into server.use()
const userRoute = require("./Server/Routes/user");
server.use("/user", userRoute);

// Database connection

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  function (err) {
      if (!err) {
          console.log('Connected to mongoDB.');
      } else {
          console.log('Failed to connect to mongoDB!', err);
      }
  });


//Change to point to front end
server.get('/', (req, res) => {
  res.send('This is the Backend Server');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});