const mongoose = require('mongoose');
const Team = mongoose.model('Team');

const viewsRoot = 'pages/team'

exports.getTeams = (req, res) => {
	res.render(`${viewsRoot}/teams`, {
		title: 'Teams Page'
	});
};

exports.createTeamForm = async (req, res) => {
	res.render(`${viewsRoot}/create`, {
		title: 'Create a Team'
	});
};