const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const crypto = require('crypto');

const mail = require('../handlers/mailer');

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Login Failed!',
	successRedirect: '/',
	successFlash: 'You are now logged in.'
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
	res.redirect('/login');
};

exports.forgotPassword = async (req, res, next) => {
	// 1. See if user exists
	const user = await User.findOne({ email: req.body.email })

	if (!user) {
		req.flash('success', 'A password reset has been emailed to you');
		return res.redirect('/login');
	}

	// console.log('user', user)

	// 2. Set reset tokens and expiry on their acct
	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 3600000; // 1hr from now

	await user.save();

	// 3. Send email w/ token
	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;

	mail.send({
		user,
		subject: 'Password Reset',
		resetURL,
		filename: 'password-reset' // Looks for password-reset pug file
	});

	req.flash('success', 'You have been emailed a password reset link.');

	res.redirect('/login');
};