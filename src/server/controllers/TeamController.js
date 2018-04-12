const mongoose = require('mongoose');
const util = require('util');
const promisify = util.promisify;
require('util.promisify').shim();
const validator = require('validator');

const Team = mongoose.model('Team');

const { consoleTypes } = require('../models/Team');
const upload = require('../handlers/multers3');

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
		res.redirect(`/teams/pages/${pages}`);
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

exports.getUserTeam = async (req, res, next) => {
	if (!req.user || !req.user.team) {
		return next(); // Skip if no team
	}

	const team = await Team.findById({ _id: req.user.team });

	req.team = team;

	next();
};

exports.getTeamBySlug = async (req, res, next) => {
	const team = await Team.findOne({ slug: req.params.slug });

	if (!team) {
		return next();
	}

	res.render(`${viewsRoot}/team`, {
		title: team.name,
		team
	});
};

exports.createTeamForm = async (req, res) => {
	res.render(`${viewsRoot}/create`, {
		title: 'Create a Team',
		body: req.body,
		consoleTypes
	});
};

exports.createTeam = async (req, res, next) => {
	req.body.owner = req.user._id;
	req.body.members = [req.user._id];

	if (req.file) {
		req.body.photo = req.file.location
	}

	const newTeam = new Team(req.body);

	const team = await newTeam.save();

	req.team = team;

	next();
};

exports.updateTeam = async (req, res, next) => {
	const team = await Team.findOne({ slug: req.params.slug });
	const newName = req.body.name;

	if (!team) {
		throw new Error('No team by that name found.');
	}

	if (req.user._id.toString() === team.owner.toString()) {
		const newSlug = await Team.getUniqueSlug(team.name, newName);
		req.body.slug = newSlug;

		const updatedTeam = await Team.findOneAndUpdate(
			{ _id: team._id },
			req.body,
			{
				new: true, // Returns the new store instead of old one (findOneAndUpdate returns old store by default, force it to new)
				runValidators: true
			}
		).exec();

		req.flash('success', 'Updated your team!');

		res.redirect(`/teams/${updatedTeam.slug}`);
	}

};

exports.validateCreateTeam = (req, res, next) => {
	req.sanitizeBody('name');
	req.check('name', 'Team name must be between 3 - 50 characters long').len(3, 50);

	req.sanitizeBody('description');

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

exports.uploadPhoto = upload.single('photo');
