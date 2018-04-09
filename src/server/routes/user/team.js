const express = require('express');
const router = express.Router();

const { catchErrors } = require('../../handlers/errorHandlers');

const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');
const teamController = require('../../controllers/TeamController');

router.get('/teams',
	catchErrors(teamController.getTeamById),
	catchErrors(teamController.getTeams)
);

router.get('/teams/create', 
	authController.isLoggedIn,
	teamController.createTeamForm
);

router.post('/teams/create', 
	teamController.validateCreateTeam,
	catchErrors(teamController.createTeam),
	catchErrors(userController.addTeam)
);

router.get('/teams/:slug', catchErrors(teamController.getTeamBySlug));

module.exports = router;