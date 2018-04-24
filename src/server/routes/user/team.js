import express from 'express';

import { catchErrors } from '../../handlers/errorHandlers';

import authController from '../../controllers/AuthController';
import userController from '../../controllers/UserController';
import teamController from '../../controllers/TeamController';

const router = express.Router();

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

router.post('/apply/:slug',
	authController.isLoggedIn,
	catchErrors(teamController.processInviteRequest),
	catchErrors(userController.applyForTeam)
);
module.exports = router;