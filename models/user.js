const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

const userSchema = new Schema({
  //Name: { type: String, required: true },
  //username: {
  //  type: String,
  //  unique: false,
//	match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
//	required: true
  //},
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false},
  Equipment:[String],
  Workout: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
  Exercise: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]

});

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO Password PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model("User", userSchema);
module.exports = User;
