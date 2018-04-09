const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const viewsRoot = 'pages/events';

exports.events = (req, res) => {
	res.render(`${viewsRoot}/events`, {
		title: 'Events'
	});
};

exports.getEvent = (req, res, next) => {
	res.json(req.params);
};