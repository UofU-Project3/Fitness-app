const router = require("express").Router();
const exerciseRoutes = require("./exercise");
const workoutRoutes = require("./workout");
const userRoutes = require("./user");

// Exercise routes
router.use("/exercises", exerciseRoutes);
router.use("/workouts", workoutRoutes);
router.use("/user", userRoutes);
router.use("/login", userRoutes);

module.exports = router;
