const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');

// Home
router.get('/', (req, res) => {
	res.render('pages/home', {
		title: 'Home Page'
	});
});

/*
User
 */

// login
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

// logout
router.get('/logout', authController.logout);

// register
router.get('/register', userController.registerForm);
router.post('/register',
	userController.validateRegister,
	catchErrors(userController.register),
	authController.login
);

module.exports = router;
