import mongoose from 'mongoose';
import util from 'util';

const promisify = util.promisify;
require('util.promisify').shim();

const User = mongoose.model('User');
const Team = mongoose.model('Team');

exports.loginForm = (req, res) => {
	res.render('pages/login', {
		title: 'Login'
	});
};

exports.registerForm = (req, res) => {
	res.render('pages/register', {
		title: 'Register'
	});
};

exports.validateRegister = (req, res, next) => {
	req.sanitizeBody('username');
	req.checkBody('username', 'You must supply a username.').notEmpty();
	req.checkBody('email', 'Email is invalid.').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false
	});

	req.checkBody('password', 'Password cannot be blank').notEmpty();
	req.checkBody('password-confirm', 'Confirmed password cannot be blank').notEmpty();
	req.checkBody('password-confirm', 'Your passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render('pages/register', {
			title: "Register",
			body: req.body,
			flashes: req.flash()
		});

		return;
	}

	next();
};

exports.register = async (req, res, next) => {
	const user = new User({
		email: req.body.email,
		username: req.body.username,
		createdAt: Date.now()
	});

	const register = promisify(User.register).bind(User);

	// TODO: Handle duplicate email error
	// Redirect errors back to register page
	try {
		await register(user, req.body.password);
	} catch(error) {
		// res.json(error);
		req.flash('error', error.message);
		res.render('pages/register', {
			title: "Register",
			body: req.body,
			flashes: req.flash()
		});

		return;
	}


	next();
};

exports.account = async (req, res, next) => {
	const team = await Team.findOne({ _id: req.user.team });

	res.render('pages/user/account', {
		title: 'My Account',
		team
	});
};

exports.updateAccount = async (req, res) => {
	const updates = {
		username: req.body.username,
		email: req.body.email
	};

	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{
			new: true,
			runValidators: true,
			context: 'query'
		}
	);

	req.flash('success', 'Your account has been updated!');

	res.redirect('/account');
};

exports.deleteTeam = async (req, res, next) => {
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: { team: undefined } },
		{
			new: true,
			context: 'query'
		}
	);

	next();
};

exports.forgotPassword = (req, res) => {
	res.render('pages/passwordReset', {
		title: 'Reset Password'
	});
};

exports.addTeam = async (req, res, next) => {
	const updates = {
		team: req.team._id
	};

	const user = await User.findByIdAndUpdate(
		req.user._id,
		updates,
		{ new: true }
	);

	if (!user) {
		return next({message: 'There was an error adding team'}, false);
	}

	req.flash('success', 'Team was successfully created!');
	res.redirect(`/teams/${req.team.slug}`);
};
