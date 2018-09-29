const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  Name: { type: String, required: true },
  Dates: [Date],
  Exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  CreatedBy: { type: Schema.Types.ObjectId, ref: 'User' }

});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
