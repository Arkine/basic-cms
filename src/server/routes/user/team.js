const express = require('express');
const router = express.Router();

const { catchErrors } = require('../../handlers/errorHandlers');

const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');
const teamController = require('../../controllers/TeamController');

router.get('/',
	catchErrors(teamController.getUserTeam),
	catchErrors(teamController.getTeams)
);

router.get('/create',
	authController.isLoggedIn,
	teamController.createTeamForm
);

// Local file storage strat
// router.post('/create',
// 	authController.isLoggedIn,
// 	teamController.upload,
// 	catchErrors(teamController.resize),
// 	teamController.validateCreateTeam,
// 	catchErrors(teamController.createTeam),
// 	catchErrors(userController.addTeam)
// );

// S3 storage strat
router.post('/create',
	authController.isLoggedIn,
	teamController.uploadPhoto,
	teamController.validateCreateTeam,
	catchErrors(teamController.createTeam),
	catchErrors(userController.addTeam)
);

// team
router.get('/:slug',
	catchErrors(teamController.getTeamBySlug)
);

router.post('/:slug',
	authController.isLoggedIn,
	catchErrors(teamController.userCanUpdate),
	catchErrors(teamController.updateTeam)
);

// router.post('/delete/:slug',
// 	authController.isLoggedIn,
// 	catchErrors(teamController.userCanUpdate),
// 	catchErrors(teamController.deleteTeamMembers),
// 	catchErrors(userController.deleteTeam),
// 	catchErrors(teamController.deleteTeam)
// );
router.post('/delete/:slug',
	authController.isLoggedIn,
	catchErrors(teamController.userCanUpdate),
	catchErrors(teamController.deleteTeamMembers),
	catchErrors(teamController.deleteTeam)
);
module.exports = router;