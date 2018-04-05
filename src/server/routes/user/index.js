const express = require('express');
const router = express.Router();

const { catchErrors } = require('../../handlers/errorHandlers');

const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');

/*
User
 */

// login
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

// logout
router.get('/logout', authController.logout);

// register
router.get('/register', authController.isRegistered, userController.registerForm);
router.post('/register',
	userController.validateRegister,
	catchErrors(userController.register),
	authController.login
);

// account page
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

// password Reset
router.get('/password-reset', userController.forgotPassword);
router.post('/password-reset', catchErrors(authController.forgotPassword));
// router.get('/account/reset/:token', catchErrors(authController.reset));
// router.post('/account/reset/:token', authController.confirmPasswordReset);

module.exports = router;
