const express = require('express');
const router = express.Router();

const { catchErrors } = require('../../handlers/errorHandlers');

const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');
const teamController = require('../../controllers/TeamController');

router.get('/teams', teamController.getTeams);

module.exports = router;