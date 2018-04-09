const express = require('express');
const router = express.Router();

const { catchErrors } = require('../../handlers/errorHandlers');

const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');

// account page
router.get('/account',
	authController.isLoggedIn,
	catchErrors(userController.account)
);
router.post('/account', catchErrors(userController.updateAccount));

// password Reset
router.get('/password-reset', userController.forgotPassword);
router.post('/password-reset', catchErrors(authController.forgotPassword));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
	authController.confirmedPasswords,
	catchErrors(authController.update)
);

module.exports = router;