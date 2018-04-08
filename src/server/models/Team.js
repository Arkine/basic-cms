const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');

const teamSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'You must supply a team name!'
	},
	owner: mongoose.Schema.ObjectId,
	createdAt: Date,
	thumbnail: {
		type: String
	},
	console: {
		type: String,
		enum: ['PC', 'XBOX', 'PS'],
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
	members: [mongoose.Schema.ObjectId],

});

teamSchema.pre('save', async function(next) {
	if (!this.isModified('name')) {
		return next(); // skip it
	}

	console.log(this);

	this.slug = slug(this.name);
	// Find other teams with same name to reduce slug collision
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');

	const teamsWithSlug = await this.constructor.find({ slug: slugRegEx });
	
	if (teamsWithSlug.length) {
		this.slug = `${this.slug}-${teamsWithSlug.length + 1}`;
	}

	next();
});


exports.module = mongoose.model('Team', teamSchema);