const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');
const validator = require('validator');

const { checkUniqueSlug } = require('./helpers');

const consoleTypes = ['PC', 'XBOX', 'PS'];

const teamSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'You must supply a team name!'
	},
	owner: mongoose.Schema.ObjectId,
	created: {
		type: Date,
		default: Date.now()
	},
	photo: String,
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
	members: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}]
});

teamSchema.pre('save', checkUniqueSlug);
teamSchema.pre('find', autoPopulate);
teamSchema.pre('findOne', autoPopulate);
// teamSchema.pre('findOneAndUpdate', checkUniqueSlug);

function autoPopulate(next) {
	this.populate('members');
	next();
}

teamSchema.statics.getUniqueSlug = async function(currentName, newName) {
	if (currentName === newName) {
		return newName;
	}

	let newSlug = slug(newName);

	// Find other teams with same name to reduce slug collision
	const slugRegEx = new RegExp(`^(${newSlug})((-[0-9]*$)?)$`, 'i');

	const itemsWithSlug = await this.find({ slug: slugRegEx });

	if (itemsWithSlug.length) {
		newSlug = `${newSlug}-${itemsWithSlug.length + 1}`;
	}

	return newSlug;

}


exports.module = mongoose.model('Team', teamSchema);
exports.consoleTypes = consoleTypes;