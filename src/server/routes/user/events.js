import express from 'express';

import { catchErrors } from '../../handlers/errorHandlers';

import eventController from '../../controllers/EventController';
// import userController from '../../controllers/UserController';

const router = express.Router();

// router.use('/events', new eventController().route());
router.get('/', catchErrors(eventController.events));
router.get('/:id', eventController.getEvent);

module.exports = router;