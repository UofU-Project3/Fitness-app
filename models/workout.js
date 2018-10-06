const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  Name: { type: String, required: true },
  Dates: [Date],
  Exercises: Array,
  CreatedBy: String,

});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
