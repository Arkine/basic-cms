import express from 'express';

import { catchErrors } from '../../handlers/errorHandlers';

import eventsController from '../../controllers/EventsController';
// import userController from '../../controllers/UserController';

const router = express.Router();

router.get('/events', eventsController.events);
router.get('/events/:id', eventsController.getEvent);

module.exports = router;