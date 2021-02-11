var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "shortly"
mongoose.connect('mongodb://localhost/workouts6');

// configure our server with all the middleware and routing
// require('./config/middleware.js')(app, express);
var morgan = require('morgan');
var bodyParser = require('body-parser');

var middleware = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/..'));
};
middleware(app, express);

// require('./config/routes.js')(app, express);
// app.get('/:code', linksController.navToLink);      not sure what this is

// app.post('/api/users/signin', userController.signin);         later
// app.post('/api/users/signup', userController.signup);
// app.get('/api/users/signedin', userController.checkAuth);

// authentication middleware used to decode token and made available on the request
// app.use('/api/links', helpers.decode);

workoutsController = require('./workoutsController.js');
app.get('/api/workouts', workoutsController.allWorkouts);
app.post('/api/workouts', workoutsController.newWorkout);

// If a request is sent somewhere other than the routes above,
// send it through our custom error handler
var helpers = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.status(500).send({error: error.message});
  }
};

app.use(helpers.errorLogger);
app.use(helpers.errorHandler);













// start listening to requests on port 8000
app.listen(8080);


console.log('now listening');
