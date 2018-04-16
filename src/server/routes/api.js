const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const teamController = require('../controllers/TeamController');

router.get('/api/v1/search/teams', catchErrors(teamController.searchTeams));

module.exports = router;