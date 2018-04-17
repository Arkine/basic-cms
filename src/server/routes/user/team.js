const express = require('express');
const router = express.Router();

const { catchErrors } = require('../../handlers/errorHandlers');

const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');
const teamController = require('../../controllers/TeamController');

// router.get('/teams',
// 	catchErrors(teamController.getUserTeam),
// 	catchErrors(teamController.getTeams)
// );

router.get('/teams/create',
	authController.isLoggedIn,
	teamController.createTeamForm
);

// Local file storage strat
// router.post('/teams/create',
// 	authController.isLoggedIn,
// 	teamController.upload,
// 	catchErrors(teamController.resize),
// 	teamController.validateCreateTeam,
// 	catchErrors(teamController.createTeam),
// 	catchErrors(userController.addTeam)
// );

// S3 storage strat
router.post('/teams/create',
	authController.isLoggedIn,
	teamController.uploadPhoto,
	teamController.validateCreateTeam,
	catchErrors(teamController.createTeam),
	catchErrors(userController.addTeam)
);

// team
router.get('/teams/:slug',
	catchErrors(teamController.getTeamBySlug)
);

router.post('/teams/:slug',
	authController.isLoggedIn,
	catchErrors(teamController.userCanUpdate),
	catchErrors(teamController.updateTeam)
);

router.post('/teams/delete/:slug',
	authController.isLoggedIn,
	catchErrors(teamController.userCanUpdate),
	catchErrors(userController.deleteTeam),
	catchErrors(teamController.deleteTeam)
);

module.exports = router;