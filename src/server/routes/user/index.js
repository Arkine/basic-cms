import express from 'express';

import auth from './auth';
import account from './account';
import team from './team';
import events from './events';

const router = express.Router();

// Home
router.get('/', (req, res) => {
	res.render('pages/home', {
		title: 'Home Page'
	});
});

router.use('/', auth);
router.use('/', account);
router.use('/teams', team);
router.use('/events', events);

module.exports = router;