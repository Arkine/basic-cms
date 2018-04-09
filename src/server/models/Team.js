const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const validator = require('validator');

const { checkUniqueSlug } = require('./helpers');

const consoleTypes = ['PC', 'XBOX', 'PS'];

const teamSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'You must supply a team name!',
		validate: [
			{ validator: validator.isAlpha, msg: 'Team name must only contain letters!' }
		]
	},
	owner: mongoose.Schema.ObjectId,
	created: {
		type: Date,
		default: Date.now()
	},
	thumbnail: {
		type: String
	},
	console: {
		type: String,
		enum: consoleTypes,
		default: 'PC'
	},
	slug: String,
	description: {
		type: String,
		trim: true
	},
	wins: {
		type: Number,
		default: 0
	},
	losses: {
		type: Number,
		default: 0
	},
	members: [mongoose.Schema.ObjectId]
});

teamSchema.pre('save', checkUniqueSlug);

exports.module = mongoose.model('Team', teamSchema);
exports.consoleTypes = consoleTypes;