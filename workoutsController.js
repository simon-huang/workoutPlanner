var Q = require('q');
var Workout = require('./workoutsModel.js');

// Promisify a few mongoose methods with the `q` promise library
var findWorkout = Q.nbind(Workout.findOne, Workout);
var createWorkout = Q.nbind(Workout.create, Workout);
var findAllWorkouts = Q.nbind(Workout.find, Workout);

module.exports = {
  allWorkouts: function (req, res, next) {
    findAllWorkouts({})
      .then(function (workouts) {
        res.json(workouts);
      })
      .fail(function (error) {
        next(error);
      });
  },

  // should refactor to make sure there isn't one of the same name for this user
  newWorkout: function (req, res, next) {
    var newWorkout = {
      name: req.body.name,
      workouts: req.body.exercises,
      user: public
    };
    createWorkout(newWorkout)
      .then(function (createdWorkout) {
        if (createdWorkout) {
          res.json(createdWorkout);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};