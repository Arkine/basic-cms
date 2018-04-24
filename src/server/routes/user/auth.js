import express from 'express';

import { catchErrors } from '../../handlers/errorHandlers';

import authController from '../../controllers/AuthController';
import userController from '../../controllers/UserController';

const router = express.Router();


// Bnet login
router.get('/auth/bnet', authController.loginBnet);
router.get('/auth/bnet/callback', authController.loginBnet);

// login
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

// logout
router.get('/logout', authController.logout);

// register
router.get('/register',
	authController.isRegistered,
	userController.registerForm
);

router.post('/register',
	userController.validateRegister,
	catchErrors(userController.register),
	authController.login
);

module.exports = router;