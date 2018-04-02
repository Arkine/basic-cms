/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

const fs = require('fs');

exports.moment = require('moment');

exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one
exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;

// inserting an SVG Icon
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the site
exports.siteName = `Node Self CMS`;

exports.menu = [
  { slug: '/', title: 'Home', icon: null },
  { slug: '/teams', title: 'Teams', icon: null },
  { slug: '/events', title: 'Events', icon: null },
  { slug: '/leaderboards', title: 'Leaderboards', icon: null }
];
