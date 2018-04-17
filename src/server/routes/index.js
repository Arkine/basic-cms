const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./user');
const adminRoutes = require('./admin');
const apiRoutes = require('./api');

// Home
router.get('/', (req, res) => {
	res.render('pages/home', {
		title: 'Home Page'
	});
});

// router.use('/', adminRoutes);
router.use('/', userRoutes);
router.use('/', apiRoutes);

module.exports = router;