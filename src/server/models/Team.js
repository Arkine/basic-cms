import mongoose from 'mongoose';
import slug from 'slugs';
import validator from 'validator';

import { checkUniqueSlug, hasLength } from './helpers';

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const consoleTypes = ['PC', 'XBOX', 'PS'];
const playStyles = ['Casual', 'Competitive'];

const teamSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'You must supply a team name!',
		validate: hasLength('Team Name', 3, 50)
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
	playStyle: {
		type: String,
		enum: playStyles,
		default: 'Casual'
	},
	members: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}]
});

teamSchema.pre('save', checkUniqueSlug);
teamSchema.pre('find', autoPopulate);
teamSchema.pre('findOne', autoPopulate);

// Define our indexes
teamSchema.index({
	name: 'text'
});

function autoPopulate(next) {
	this.populate('members');
	next();
}

// This is the same functionally as the checkUniqueSlug in our helper. Just needed to bring it into context
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

module.exports = mongoose.model('Team', teamSchema);