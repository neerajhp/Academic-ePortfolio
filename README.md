# UoM COMP30022 Capstone Project 2020

A personal ePortfolio application capable of storing and managing documents and multimedia.
This application is designed to present a student's evidence of achievement throughout their academic career.
Written by Team Home Alone

<p float="left">
<img src="https://github.com/neerajhp/Academic-ePortfolio/blob/media/LandingPage.png" width="40%" />
<img src="https://github.com/neerajhp/Academic-ePortfolio/blob/media/LoginPage.png" width="40%" />  
                                                                                               </p>
                                                                                               

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.



### Prerequisites

What things you need to install the software and how to install them

To get started, you will need to download Node.js and NPM

Download links:

https://nodejs.org/en/download/   (NPM manager included in the download)


### Installing

A step by step series of examples that tell you how to get a development env running

Once you have Node.js, NPM and have cloned the repository, you will need to run this command: 
```
npm install
```
The command must be run in both the root folder and the client folder. This is to make sure that all of the required dependencies are installed. 

### Available Scripts

After the dependencies have been installed, the following scripts can be run: 

```
npm run dev
```
Runs the app in development mode by concurrently running both the client and server. 
Open http://localhost:3000 to view it in the browser.

```
npm client
```
Runs the client in development mode.
Open http://localhost:3000 to view it in the browser.

```
npm server
```
Runs the server in development mode
Open http://localhost:5000 to view it in the browser

```
npm test
```
Runs the backend tests

### Running the tests

## Frontend Testing
Explain how to run the automated tests for this system

## Backend Testing
To run the backend tests, a local instance of MongoDB will be required and can be downloaded from https://www.mongodb.com/try/download/community

After installing the local instance of MongoDB, make sure that the server is running, type npm test to run the testing suite. The test should give a list of testing suite that have passed and failed, and a coverage map showing what code is not being covered by the testing suites.

A coverage folder is also automatically generated, and can be accessed from the browser to view code coverage in more detail

Alternatively, if you do not wish to install a local instance of MongoDB, a online database is available, this can be accessed by changing the test.env file in the config folder. The DB_CONNECTION is the variable being used to connect to the database, replacing this with the DB_ALTERNATIVE string will connect the server to an online database. 

*Warning*
Please note that testing conducted on the online server is not as reliable as local and may lead to some false positive or false negatives, this is due to the design of the testing suite and the nature of async.

# Adding additional testing suites
Tests for the backend are located in the Test folder in the backend, additional testing suites can be added in with the extension `filename.jest.js`. Testing suites are separated based on their respective controllers, thus `userController.test.js` is testing `userController.js`.

The clearDB.js and login.js are additional functionalities to aid in testing, clearDB should be called in every testing suite to make sure the database is wiped clean after each suite of tests. login.js can be called if needed and it will signup a testing account, log in to the account, and return a JWT token, a userID, and a userName.

If routes are protected with JWT, a `.set('Cookie', 'token='+ token)` will be required to send the token retrieved from the login to the API endpoint.

When testing with supertest, the syntax is different from regular jest testing, in order to utilise the regular jest syntax, a `.then(data => {expect(data).`jest syntax here`})` is required.

Below is a example of how to use both clearDB.js and login.js:

```
const { clearDB } = require('./clearDB');
const { setupUser, loginUser, idUser, getuserName } = require('./login');

clearDB();
setupUser();

let token;
let ID;
let userName;
beforeAll(async () => {
    token = await loginUser();
    ID = await idUser();
    userName = await getuserName();
})
```

The `setupUser()` function sets up a testing account (credentials can be modified in login.js), and signs in the user. It also allows the testing suite to access the JWT token of the user, the user ID and the username. After the testing is done, the `clearDB()` function will remove the mongoDB collection so that the next testing suite can start from a clean slate.

# How does a test work (Example)
```
test("Should return information on the user", async () => {
    await request.get("/api/user/userInfo")
    .set('Cookie', 'token='+ token)
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body.userName).toEqual("test")
        expect(response.body.firstName).toEqual("test")
        expect(response.body.lastName).toEqual("test")
        expect(response.body.email).toEqual("test@gmail.com")
        expect(response.body.mobileNumber).toEqual("0123456789")
        expect(response.body.birthDate).toEqual(expect.objectContaining(new Date("2000/01/01")))
    })
})
```

This is an example of a test taken from userController.test.js. A test should be enclosed in a `test()`; the "" after is used to name the test in this case `"Should return information on the user"`; async is required as the test needs to be awaited before moving on to the next test; a request is then made to the API Endpoint, in this case it is a GET request `await request.get("/api/user/userInfo")`; an authentication is also required as this route is protected with JWT, `.set('Cookie', 'token='+ token)`; in the case that it is a POST or PUT request a `.send()` will be required `.send({email: "test@gmail.com",password: "test123"})`, sending an object within `{}`; a response is then expected, in this case a HTTP status code 200 `.expect(200)`; if you would like to test the response body with jest syntax, you will have to do a `.then((response) => {}`, examples of jest syntax can be seen in the example above.



### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

A production deployment of this project exists at https://homealone30022.herokuapp.com/

## Built With

- [React.JS](https://reactjs.org/) - The Front End Javascript Library used
- [Node.JS](https://nodejs.org/en/) - The Back End Javascript Runtime Engine
- [NPM](https://www.npmjs.com/) - Dependency Management
- [Express](https://expressjs.com/) - Back End Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [MaterialUI](https://material-ui.com/) - React Components

## Authors

- **Denzel Tano** - [Github](https://github.com/dtano)
- **Jinxin Tian** - [Github](https://github.com/JinxinT)
- **Kai Ying Lim** - [Github](https://github.com/LKY1999)
- **Neeraj Patel** - [Github](https://github.com/neerajhp)
- **Polo Chiu** - [Github](https://github.com/polopineapple)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
