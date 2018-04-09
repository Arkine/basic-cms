const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

// const roles = {
// 	"admin",
// 	"user"
// };

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid Email Address.']
	},
	username: {
		type: String,
		required: 'Please supply a username.',
		trim: true,
		unique: true,
		lowercase: true
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	created: {
		type: Date,
		default: Date.now()
	},
	lastLogin: Date,
	thumbnail: {
		type: String
	},
	team: mongoose.Schema.ObjectId,
	guildRole: String,
	friends: [mongoose.Schema.ObjectId],
	role: String
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'username',
	lastLoginField: 'last'
});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);