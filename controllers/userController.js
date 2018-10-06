const db = require("../models");
const User = require("../models/user");
// Defining methods for the UsersController
module.exports = {
  findAll: function(req, res) {
    console.log(req.session);
    db.getCollection('sessions').find({})
      
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

findOne: function(req, res){
  console.log('user signup');
  const{ username, password, Name} = req.body
  db.User
  .findOne({username:username}, (err, user) => {
  if (err) {
    console.log('User.js post error: ', err)
} else if (user) {
    res.json({
        error: `Sorry, already a user with the username: ${username}`
    })
}
else {
    const newUser = new User({
        Name: Name,
        password: password,
        username: username
    })
    newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        res.json(savedUser)
    })
  }
})
},






  
};
const mongoose = require("mongoose");


mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/exerciselist"
);