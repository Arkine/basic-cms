import express from 'express';

import auth from './auth';
import account from './account';
import team from './team';
import events from './events';

import { catchErrors } from '../../handlers/errorHandlers';

import teamController from '../../controllers/TeamController';
import eventController from '../../controllers/EventController';
import userController from '../../controllers/UserController';

const router = express.Router();

// Hits all routes to add the users team data
router.use(catchErrors(teamController.getUserTeam));

// Home
router.get('/', (req, res) => {
	res.render('pages/home', {
		title: 'Home',
	});
});

router.use('/', auth);
router.use('/', account);
router.use('/teams', team);
router.use('/events', events);

module.exports = router;