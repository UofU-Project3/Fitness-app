const router = require("express").Router();
const userController = require("../../controllers/userController");
//const router = express.Router()
const passport = require('../../passport')

// Matches with "/api/users"
router.route("/user")
    .post(userController.findOne);
router.route("/user/session")
    .get(userController.findAll);
//.post(userController.create);

// Matches with "/api/users/:id"
router
    .route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

router
    .route("/")
//.post(userController.findOne);
router.get("/profile",
  passport.authenticate("cookie", { session: false }),
  function(req, res) {
    res.json(req.user);
  });

router.post('/login', (req, res) => passport.authenticate('local', 
{ successRedirect: '/scheduler', failureRedirect: '/login', })(req, res)

);
//router.post('/login',
    //function (req, res, next) {
       // console.log('routes/user.js, login, req.body: ');
        //console.log("REQ.BODY: ", req.body);
       // next();
    //},

    //passport.authenticate('local'),
   // (req, res) => {
    //    console.log('logged in', req.user);
    //    var userInfo = {
    //        username: req.user.username
    //    };
    //    res.send(userInfo);
    //}
//)

//router.get('/', (req, res, next) => {
//    console.log('===== user!!======')
//    console.log(req.user)
//    if (req.user) {
//        res.json({ user: req.user })
//    } else {
//        res.json({ user: null })
//    }
//})
//
//router.post('/logout', (req, res) => {
//    if (req.user) {
//        req.logout()
//        res.send({ msg: 'logging out' })
//    } else {
//        res.send({ msg: 'no user to log out' })
//    }
//})
module.exports = router;

