const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./user');
const adminRoutes = require('./admin');

// Home
router.get('/', (req, res) => {
	res.render('pages/home', {
		title: 'Home Page'
	});
});

// router.use('/', adminRoutes);
router.use('/', userRoutes);

module.exports = router;