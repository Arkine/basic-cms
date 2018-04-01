const mongoose = require('mongoose');
const User = mongoose.model('User');
const util = require('util');
const promisify = util.promisify;
require('util.promisify').shim();

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
		username: req.body.username
	});

	await User.registerAsync(user, req.body.password);

	next();
};