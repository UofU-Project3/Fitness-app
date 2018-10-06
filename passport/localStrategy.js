const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	{
		usernameField: 'username', // not necessary, DEFAULT
		
	},
	function(username, password, done) {
		console.log("Local:", username);
		User.findOne({ username: username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect Username' })
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect Password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy
