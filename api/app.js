'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const {sequelize} = require("./models");
const users = require("./routes/users");
const courses = require("./routes/courses");
const cors = require("cors");

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// for parsing application/json
app.use(express.json());

//Add CORS Support to REST API
app.use(cors() );

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// TODO setup your api routes here
app.use("/api",users);
app.use("/api",courses);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//database connect test 
(async ()=>{
  try{
    //testing connection 
    await sequelize.authenticate();
    //log out the database connecting successful message
    console.log("Database Connected!")
  }catch(err){
    //log out the database connecting failed
    console.error('Unable to connect to the database:', err);
  }
})();

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  //convert all error message into array
  const errors = err.errors.map(data => data.message);

  res.status(err.status || 500).json({
    message: errors,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
