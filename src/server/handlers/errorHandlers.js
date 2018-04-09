exports.developmentErrors = (err, req, res, next) => {
	err.stack = err.stack || '';
	const errorDetails = {
		message: err.message,
		status: err.status,
		stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
	}
	res.status(err.status || 500);
	res.format({
		'text/html': () => {
			res.render('error', errorDetails);
		},
		'application/json': () => res.json(errorDetails)
	});

	next();
};

exports.productionErrors = (err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});

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
};

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
};