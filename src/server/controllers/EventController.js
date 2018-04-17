import mongoose from 'mongoose';
import passport from 'passport';
import util from 'util';
import express from 'express';

import BaseController from './BaseController';
import { catchErrors } from '../handlers/errorHandlers';

const User = mongoose.model('User');
const Event = mongoose.model('Event');

const viewsRoot = 'pages/events';

const router = express.Router();

export default class EventController extends BaseController {
	constructor() {
		super(Event, '_id');
	}

	async events(req, res) {
		const events = await this.list();

		res.render(`${viewsRoot}/events`, {
			title: 'Events',
			events
		});
	}


}


// exports.events = (req, res) => {
// 	res.render(`${viewsRoot}/events`, {
// 		title: 'Events'
// 	});
// };

exports.getEvent = (req, res, next) => {
	res.json(req.params);
};