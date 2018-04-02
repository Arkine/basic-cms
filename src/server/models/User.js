const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

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
	createdAt: Date,
	lastLogin: Date,
	thumbnail: {
		type: String
	},
	guild: mongoose.Schema.ObjectId,
	guildRole: String,
	friends: [mongoose.Schema.ObjectId],
	role: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

userSchema.statics.registerAsync = function (data, password) {
	return new Promise((resolve, reject) => {
		this.register(data, password, (err, user) => {
			if (err) {
				reject(err);
			}

			resolve(user);
		});
	});
}

module.exports = mongoose.model('User', userSchema);