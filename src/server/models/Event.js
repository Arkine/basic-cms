const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	title: String,
	author: mongoose.Schema.ObjectId,
	dateCreated: Date,
	description: String,
	thumbnail: String,
	slug: String
});

exports.module = mongoose.model('Event', eventSchema);