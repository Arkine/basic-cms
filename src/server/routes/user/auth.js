import express from 'express';

const router = express.Router();

import { catchErrors } from '../../handlers/errorHandlers';

import authController from '../../controllers/AuthController';
import userController from '../../controllers/UserController';

// TODO: Probably move this all to admin and make bnet only strat

// login
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

// Bnet login
router.get('/auth/bnet', authController.loginBnet);
router.get('/auth/bnet/callback', authController.loginBnet);

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