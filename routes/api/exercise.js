const router = require("express").Router();
const exerciseController = require("../../controllers/exerciseController");

// Matches with "/api/exercises"
router.route("/exercises/cardio")
  .get(exerciseController.findCardio);
router.route("/exercises/olympic")
  .get(exerciseController.findOlympic);
router.route("/exercises/powerlifting")
  .get(exerciseController.findPowerlifting);
router.route("/exercises/strength")
  .get(exerciseController.findStrength);
router.route("/exercises/stretching")
  .get(exerciseController.findStretching);

// Matches with "/api/exercises/:id"
router
  .route("/:id")
  .get(exerciseController.findById)
  .put(exerciseController.update)
  .delete(exerciseController.remove);

module.exports = router;
