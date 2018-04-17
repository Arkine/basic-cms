import mongoose from 'mongoose';
import passport from 'passport';
import util from 'util';
import express from 'express';

import BaseController from './BaseController';

const User = mongoose.model('User');
const Event = mongoose.model('Event');

const viewsRoot = 'pages/events';

const router = express.Router();

// export default class EventController extends BaseController {
// 	constructor() {
// 		super(Event, '_id');
// 	}

// 	// async events(req, res) {
// 	// 	const {events} = await this.list();

// 	// 	// if (!events) {
// 	// 	// 	req.flash('error', 'No events foud');
// 	// 	// 	res.redirect('/')
// 	// 	// }
// 	// 	res.render(`${viewsRoot}/events`, {
// 	// 		title: 'Events',
// 	// 		events
// 	// 	});
// 	// }

// 	// route() {
// 	// 	router.get("/", this.list);

// 	// 	return router;
// 	// }
// }


exports.events = async (req, res) => {
	const events = await Event.find({}).limit(10);

	res.render(`${viewsRoot}/events`, {
		title: 'Events',
		events
	});
};

exports.getEvent = (req, res, next) => {
	res.json(req.params);
};