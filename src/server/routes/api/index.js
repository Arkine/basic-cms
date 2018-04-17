import express from 'express';
import teamRoutes from './team';

const router = express.Router();

router.use('/', teamRoutes);

module.exports = router;