import express from 'express';

import auth from './auth';
import account from './account';
import team from './team';
import events from './events';

const router = express.Router();

router.use('/', auth);
router.use('/', account);
router.use('/', team);
router.use('/', events);

module.exports = router;