import mongoose from 'mongoose';
import md5 from 'md5';
import validator from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const roles = [
	"admin",
	"user"
];

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
	photo: String,
	team: mongoose.Schema.ObjectId,
	guildRole: String,
	friends: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}],
	role: String
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	lastLoginField: 'lastLogin'
});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);