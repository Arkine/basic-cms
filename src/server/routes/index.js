const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');

router.get('/', authController.loggedIn);


module.exports = router;
