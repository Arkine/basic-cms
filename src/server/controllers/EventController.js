import mongoose from 'mongoose';
import passport from 'passport';
import util from 'util';
import express from 'express';

// import BaseController from './BaseController';

const User = mongoose.model('User');
const Event = mongoose.model('Event');

const viewsRoot = 'pages/events';

const router = express.Router();

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