import axios from "axios";

export default {
  // Gets all exercises
  getExercises: function(value) {
    if(value === "Olympic Weight Lifting"){
      const type = "/olympic";
      return axios.get("/api/exercises/exercises"+ type);
    } else {
      const type = "/"+value.toLowerCase();
      return axios.get("/api/exercises/exercises"+ type);
    }

    
  },
  getCookie: function() {
    return axios.get("/api/user/profile");
  },
  // Gets the exercise with the given id
  getExercise: function(id) {
    return axios.get("/api/exercise/" + id);
  },
  getWorkouts: function() {
    return axios.get("/api/workouts/workouts");
  },
  // Deletes the exercise with the given id
  deleteExercise: function(id) {
    return axios.delete("/api/exercises/" + id);
  },
  // Saves a exercise to the database
  saveWorkout: function(workoutData) {
    console.log("workoutData:", workoutData);
    return axios.post("/api/workouts/workouts", workoutData);
  },
  updateWorkout: function(id) {
    return axios.put("/api/workouts/"+ id);
  }
};
