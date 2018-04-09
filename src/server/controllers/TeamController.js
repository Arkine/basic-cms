const mongoose = require('mongoose');
const util = require('util');
const promisify = util.promisify;
require('util.promisify').shim();
const validator = require('validator');

const Team = mongoose.model('Team');

const { consoleTypes } = require('../models/Team');

const viewsRoot = 'pages/team';

exports.getTeams = async (req, res) => {
	const page = req.params.page || 1;
	const limit = 20;
	const skip = (page * limit) - limit;
	const { team } = req;

	const teamsPromise = Team
		.find()
		.skip(skip)
		.limit(limit)
		.sort({'created': 'desc'});

	const countPromise = Team.count();
	const [teams, count] = await Promise.all([teamsPromise, countPromise]);
	const pages = Math.ceil(count / limit);

	if (!teams.length && skip) {
		req.flash('info', 'The requested page no longer exists.');
		res.redirect(`/stores/pages/${pages}`);
	}

	res.render(`${viewsRoot}/teams`, {
		title: 'Teams',
		teams,
		pages,
		page,
		team,
		count
	});
};

exports.getTeamById = async (req, res, next) => {
	if (!req.user || !req.user.team) {
		return next(); // Skip if no team
	}


	const team = await Team.findById({ _id: req.user.team });
	console.log(team);
	req.team = team;


	next();
};

exports.getTeamBySlug = async (req, res, next) => {
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

// TODO: Create a more consistent error handler for form errors
exports.validateCreateTeam = (req, res, next) => {
	req.sanitizeBody('name');
	req.check('name', 'Team name must be between 3 - 20 characters long').len(4, 6);
	// req.check('name', 'Team name can only contain Alphanumeric characters').regex('[a-z][A-Z]','i');

	req.sanitizeBody('description');
	req.checkBody('name', 'You must supply a team name!').notEmpty();


	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render(`${viewsRoot}/create`, {
			title: "Create a Team",
			body: req.body,
			flashes: req.flash(),
			consoleTypes
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

	req.team = team;

	next();
};

