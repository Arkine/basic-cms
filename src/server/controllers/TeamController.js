const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const util = require('util');
const promisify = util.promisify;
require('util.promisify').shim();

const { consoleTypes } = require('../models/Team');

const viewsRoot = 'pages/team';

exports.getTeams = (req, res) => {
	res.render(`${viewsRoot}/teams`, {
		title: 'Teams Page'
	});
};

exports.getTeamBySlug = async (req, res, next) => {
	console.log(req.params)
	const team = await Team.findOne({ slug: req.params.slug });

	if (!team) {
		return next();
	}

	res.render('pages/team/team', {
		title: team.name,
		team
	});
};

exports.createTeamForm = async (req, res) => {
	res.render(`${viewsRoot}/create`, {
		title: 'Create a Team',
		consoleTypes
	});
};

exports.validateCreateTeam = (req, res, next) => {
	req.sanitizeBody('name');
	req.checkBody('name', 'You must supply a team name!').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render(`${viewsRoot}/create`, {
			title: "Register",
			body: req.body,
			flashes: req.flash()
		});

		return;
	}

	next();
};

exports.createTeam = async (req, res, next) => {

	const newTeam = new Team({
		name: req.body.name,
		owner: req.user._id,
		createdAt: Date.now(),
		description: req.body.description,
		members: [req.user._id]
	});

	const team = await newTeam.save();

	req.flash('success', 'Successfully created team!');

	res.redirect(`/teams/${team.slug}`);
};

