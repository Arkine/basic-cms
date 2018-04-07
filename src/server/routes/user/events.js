const express = require('express');
const router = express.Router();

const eventsController = require('../../controllers/EventsController');

router.get('/events', eventsController.events);
router.get('/events/:id', eventsController.getEvent);

module.exports = router;