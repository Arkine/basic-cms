const express = require('express');
const router = express.Router();

const auth = require('./auth');
const account = require('./account');
const team = require('./team');
const events = require('./events'); 
const api = require('../api');

router.use('/', auth);
router.use('/', account);
router.use('/', team);
router.use('/', events);
router.use('/', api);

module.exports = router;