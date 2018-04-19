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

router.use('/admin', adminRoutes);
router.use('/', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;