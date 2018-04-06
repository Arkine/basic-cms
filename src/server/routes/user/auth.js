const express = require('express');
const router = express.Router();

const { catchErrors } = require('../../handlers/errorHandlers');

const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');

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


// TODO: Implement an OAuth strat for Battle.net logins

module.exports = router;