const User = require('../models/user')
const db = require("../models");
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	{
		usernameField: 'email', // not necessary, DEFAULT
		passReqToCallback: true,
		session: true
	},
	function(Email, Password, done) {
		console.log("Local:", Email);
		User.findOne({ Email: Email }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect Email' })
			}
			if (!user.checkPassword(Password)) {
				return done(null, false, { message: 'Incorrect Password' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy
