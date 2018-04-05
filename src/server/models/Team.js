const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const TeamSchema = new Schema({
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
	slug: String,
	description: {
		type: String,
		trim: true
	},
	wins: Number,
	losses: Number,
	members: [mongoose.Schema.ObjectId],

});



exports.module = mongoose.model('Team', TeamSchema);