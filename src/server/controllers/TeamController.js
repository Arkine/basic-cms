const mongoose = require('mongoose');
const util = require('util');
const promisify = util.promisify;
require('util.promisify').shim();
const validator = require('validator');
const jimp = require('jimp');
const uuid = require('uuid');
const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY
});
const s3 = new AWS.S3();

const multer = require('multer');
const multerS3 = require('multer-s3');
const upload = multer({
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if (isPhoto) {
			next(null, true);
		} else {
			next({ message: 'That file type isn\'t allowed' } , false);
		}
	},
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_BUCKET_NAME,
		metaData: (req, file, cb) => {
			cb(null, { fieldName: file.fieldName })
		},
		key: (req, file, cb) => {
			cb(null, Date.now().toString())
		}
	})
});

// const multerOptions = {
// 	storage: multer.memoryStorage(),
// 	fileFilter(req, file, next) {
// 		const isPhoto = file.mimetype.startsWith('image/');
// 		if (isPhoto) {
// 			next(null, true);
// 		} else {
// 			next({ message: 'That file type isn\'t allowed' } , false);
// 		}
// 	}
// }

const Team = mongoose.model('Team');

const { consoleTypes } = require('../models/Team');

const viewsRoot = 'pages/team';

// exports.getTeam = async (req, res, next) => {
// 	const Team = await Team.find
// };

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
	// const newTeam = new Team({
	// 	name: req.body.name,
	// 	owner: req.user._id,
	// 	createdAt: Date.now(),
	// 	thumbnail: req.file.location,
	// 	description: req.body.description,
	// 	members: [req.user._id]
	// });

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

// TODO: Create a more consistent error handler for form errors
exports.validateCreateTeam = (req, res, next) => {
	// console.log(req.body)
	req.sanitizeBody('name');
	req.check('name', 'Team name must be between 3 - 50 characters long').len(3, 50);
	// req.checkBody('name', 'You must supply a team name!').notEmpty();
	// req.checkBody('name', 'Team name must be Alphanumeric!').isAlpha();
	// TODO: Error if name doesn't contain letters,numbers or spaces
	// req.check('name', 'Team name can only contain Alphanumeric characters').matches(/^$/, "i");

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


// Local photo upload strat
// exports.uploadPhoto = multer(multerOptions).single('photo');
// exports.resize = async (req, res, next) => {

// 	if (!req.file) {
// 		return next();
// 	}

// 	const extension = req.file.mimetype.split('/')[1];

// 	req.body.photo = `${uuid.v4()}.${extension}`;

// 	const photo = await jimp.read(req.file.buffer);

// 	//resize(H, W)
// 	await photo.resize(800, jimp.AUTO);
// 	await photo.write(`./public/images/${req.body.photo}`);

// 	next();
// };
