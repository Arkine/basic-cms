import express from 'express';

import { catchErrors } from '../../handlers/errorHandlers';

import authController from '../../controllers/AuthController';
import userController from '../../controllers/UserController';

const router = express.Router();

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