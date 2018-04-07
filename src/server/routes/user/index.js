const express = require('express');
const router = express.Router();

const auth = require('./auth');
const account = require('./account');
const team = require('./team');
const events = require('./events'); 

router.use('/', auth);
router.use('/', account);
router.use('/', team);
router.use('/', events);

module.exports = router;
