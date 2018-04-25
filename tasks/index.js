const cron = require('node-cron');

const grabEvents = require('./events');

// Grab events data every 15min
cron.schedule('*/15 * * * *', grabEvents);