const router = require("express").Router();
const exerciseRoutes = require("./exercise.js");
const workoutRoutes = require("./workout");
const userRoutes = require("./user");

// Exercise routes
router.use("/exercises", exerciseRoutes);
router.use("/workouts", workoutRoutes);
router.use("/user", userRoutes);
router.use("/login", userRoutes);
router.use("/logout", userRoutes);

module.exports = router;
