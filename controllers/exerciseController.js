const db = require("../models");

// Defining methods for the ExercisesController
module.exports = {
  findStrength: function(req, res) { 
    db.Exercise
      .find({Type: "Strength"})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findCardio: function(req, res) { 
    db.Exercise
      .find({Type: "Cardio"})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findStretching: function(req, res) { 
    db.Exercise
      .find({Type: "Stretching"})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findPowerlifting: function(req, res) { 
    db.Exercise
      .find({Type: "Powerlifting"})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOlympic: function(req, res) { 
    db.Exercise
      .find({Type: "Olympic Weight Lifting"})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Exercise
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Exercise
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Exercise
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Exercise
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  find: function(req, res){
    console.log('Type Search', req);
    
    db.Exercise
    .find({Type: req.Type}, (err, res) => {
    
    console.log("Find Results:",res.data);
  })
  },
};
