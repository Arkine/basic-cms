import express from 'express';

// Routes
import userRoutes from './user';
import adminRoutes from './admin';
import apiRoutes from './api';

const router = express.Router();

// Home
router.get('/', (req, res) => {
	res.render('pages/home', {
		title: 'Home Page'
	});
});

router.use('/', adminRoutes);
router.use('/', userRoutes);
router.use('/', apiRoutes);

module.exports = router;