const mongoose = require('mongoose');
const app = require('./app');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <=5)) {
	console.log('You are using an older version of node. Please upgrade to Node version 7.6 or greater.')
	process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
	console.error(`There was an error connecting to the DB ${err.message}`);
});

// Import all of our models here
// require('./models/User');

// Start our app!
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running on port ${server.address().port}`);
});