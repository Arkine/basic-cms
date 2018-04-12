const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { checkUniqueSlug } = require('./helpers');

const eventSchema = new Schema({
	title: String,
	author: mongoose.Schema.ObjectId,
	created: {
		type: Date,
		default: Date.now()
	},
	description: String,
	photo: String,
	slug: String
});

eventSchema.pre('save', checkUniqueSlug);

module.exports = mongoose.model('Event', eventSchema);