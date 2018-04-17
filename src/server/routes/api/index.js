// const express = require('express');
import express from 'express';
const router = express.Router();

const teamRoutes = require('./team');

router.use('/', teamRoutes);

module.exports = router;