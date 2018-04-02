const passport = require('passport');

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Login Failed!',
	successRedirect: '/',
	successFlash: 'You are now logged in.'
});

exports.logout = (req, res) => {
	req.logout();

	req.flash('success', 'You are now logged out.');

	res.redirect('/');
};

exports.isRegistered = (req, res, next) => {
	if (req.isAuthenticated()) {
		res.redirect('/account');
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