import express from 'express';
import mongoose from 'mongoose';

import authController from '../../controllers/AuthController';
import userController from '../../controllers/UserController';

const router = express.Router();

router.get('/admin',
	authController.isLoggedIn,
	authController.isAdmin
);

module.exports = router;