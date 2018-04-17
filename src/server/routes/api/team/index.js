import express from 'express';

import { catchErrors } from '../../../handlers/errorHandlers';
import teamController from '../../../controllers/TeamController';

const router = express.Router();

router.get('/api/v1/search/teams', catchErrors(teamController.searchTeams));

module.exports = router;