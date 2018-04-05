const express = require('express');
const router = express.Router();

const auth = require('./auth');
const account = require('./account');
const team = require('./team');

router.use('/', auth);
router.use('/', account);
router.use('/', team);

module.exports = router;
