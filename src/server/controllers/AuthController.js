import mongoose from 'mongoose';
import passport from 'passport';
import crypto from 'crypto';
import util from 'util';

import BaseController from './BaseController';

const User = mongoose.model('User');
const promisify = util.promisify;
require('util.promisify').shim();

const mail = require('../handlers/mailer');

// Local
exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Email or Password is incorrect.',
	successRedirect: '/',
	successFlash: 'You are now logged in.'
});

// Battle.net
exports.loginBnet = passport.authenticate('bnet', {
	failureRedirect: '/login',
	failureFlash: 'There was an error logging into your Battle.net account.',
	successRedirect: '/',
	successFlash: 'Your are now logged in.'
});

exports.logout = (req, res) => {
	req.logout();

	req.flash('success', 'You are now logged out.');

	res.redirect('/login');
};

exports.isRegistered = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect('/account');
	}

	next();
}

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	req.flash('error', 'You must be logged in to do that!');
	// res.status(401);

	res.redirect('/login');
};

exports.forgotPassword = async (req, res, next) => {
	// 1. See if user exists
	const user = await User.findOne({ email: req.body.email })

	if (!user) {
		req.flash('success', 'A password reset has been emailed to you');
		return res.redirect('/login');
	}

	// 2. Set reset tokens and expiry on their acct
	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 3600000; // 1hr from now

	await user.save();

	// 3. Send email w/ token
	const resetURL = `${req.protocol}://${req.headers.host}/account/reset/${user.resetPasswordToken}`;

	mail.send({
		user,
		subject: 'Password Reset',
		resetURL,
		filename: 'password-reset' // Looks for password-reset pug file
	});

	req.flash('success', 'You have been emailed a password reset link.');

	res.redirect('/login');
};

exports.reset = async (req, res, next) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: {
			$gt: Date.now()
		}
	});

	if (!user) {
		req.flash('error', 'Password reset is invalid or has expired');

		return res.redirect('/login');
	}

	res.render('pages/reset', {
		title: 'Reset your password'
	});
};

exports.confirmedPasswords = (req, res, next) => {
	// If the do match, do nothing
	if (req.body.password === req.body['password-confirm']) {
		return next();
	}

	req.flash('error', 'Passwords do not match!');

	res.redirect('back');
};

exports.update = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: {
			$gt: Date.now()
		}
	});

	if (!user) {
		req.flash('error', 'Password reset is invalid or has expired.');

		return res.redirect('/login');
	}
	// const setPassword = promisify(user.setPassword).bind(user);
	const setPassword = promisify(user.setPassword).bind(user);

	await setPassword(req.body.password);

	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;

	const updatedUser = await user.save();

	console.log('new:', updatedUser.hash);

	await req.login(updatedUser);

	req.flash('success', 'Your password has been reset.');

	res.redirect('/');
};
