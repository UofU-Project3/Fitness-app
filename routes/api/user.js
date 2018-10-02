const router = require("express").Router();
const userController = require("../../controllers/userController");
const express = require('express')

  //const router = express.Router()
  const User = require('../../models/user')
  const passport = require('../../passport')

// Matches with "/api/users"
router.route("/user")
  .post(userController.findOne)
  //.post(userController.create);
  
// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);
  
  router
  .route("/")
  .post(userController.findOne);

 
  router.post('/login', (req, res) => passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', })(req, res));
 // router.post('/', (req, res) => {
     // console.log('user signup');
  
      //const { name, password, email } = req.body
      // ADD VALIDATION
      //User.findOne({ email: email }, (err, user) => {
          //if (err) {
        //      console.log('User.js post error: ', err)
        //  } else if (user) {
            //  res.json({
            //      error: `Sorry, already a user with the email: ${email}`
           //   })
          //}
         // else {
            //  const newUser = new User({
            //      Name: name,
            //      password: password,
              //    email: email
            //  })
             // newUser.save((err, savedUser) => {
             //     if (err) return res.json(err)
            //      res.json(savedUser)
             // })
         // }
     // })
 // })
  //
  //router.post('/login',
  //    function (req, res, next) {
  //        console.log('routes/user.js, login, req.body: ');
  //        console.log("REQ.BODY: ",req.body);
  //        next();
  //    },
      
      //passport.authenticate('local'),
      //(req, res) => {
      //    console.log('logged in', req.user);
      //    var userInfo = {
      //        Email: req.user.Email
      //    };
      //    res.send(userInfo);
      //}
 // )
  
  router.get('/', (req, res, next) => {
      console.log('===== user!!======')
      console.log(req.user)
      if (req.user) {
          res.json({ user: req.user })
      } else {
          res.json({ user: null })
      }
  })
  
  router.post('/logout', (req, res) => {
      if (req.user) {
          req.logout()
          res.send({ msg: 'logging out' })
      } else {
          res.send({ msg: 'no user to log out' })
      }
  })
module.exports = router;
