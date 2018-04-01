exports.developmentErrors = (req, res, next) => {
	next();
};

exports.productionErrors = (req, res, next) => {
	next();
};


exports.catchErrors = (fn) => {
	return function(req, res, next) {
		return fn(req, res, next).catch(next);
	}
};

exports.flashValidationErrors = (err, req, res, next) => {
	if (!err.errors) {
		return next(err);
	}

	const errorKeys = Object.keys(err.errors);
	errorKeys.forEach(key => req.flash('error', err.errors[key].message));

	res.redirect('back');
}