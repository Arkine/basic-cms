import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import util from 'util';
import flash from 'connect-flash';
import expressValidator from 'express-validator';
import http from 'http';

import routes from './server/routes';
import helpers from './helpers';
import errorHandlers from './server/handlers/errorHandlers';
import './server/handlers/passport';

const MongoStore = require('connect-mongo')(session);
const promisify = util.promisify;
require('util.promisify').shim();

const app = express();

// enforce HTTPS
if (process.env.NODE_ENV === 'production') {
	app.use((req, res, next) => {
		if (req.secure) {
			next();
		} else {
			res.redirect(`https://${req.headers.host}${req.url}`);
		}

	});
}

// view engine setup
app.set('views', path.join(__dirname, '/common/views'));
app.set('view engine', 'pug');

// Set static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Turn raw requests to usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Expose methods for validating data
app.use(expressValidator());

// Populates req.cookies
app.use(cookieParser());

// Session data for visitors for sending flashes and keeping users logged in
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware let's us use req.flash('messagetype', 'message'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
	res.locals.h = helpers;
	res.locals.flashes = req.flash();
	res.locals.user = req.user || null;
	res.locals.currentPath = req.path;
	next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
	req.login = promisify(req.login, req);

	next();
});

// Set routes
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
