var mongoose = require('mongoose');

var WorkoutSchema = new mongoose.Schema({
  name: String,
  exercises: String,
  user: String
});

module.exports = mongoose.model('Workout', WorkoutSchema);
