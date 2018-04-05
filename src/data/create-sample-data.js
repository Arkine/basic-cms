require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

// import all of our models - they need to be imported only once
const User = require('../server/models/User');
const Team = require('../server/models/Team');

const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));
const teams = JSON.parse(fs.readFileSync(__dirname + '/teams.json', 'utf-8'));

async function deleteData() {
	console.log('Deleting Sample Data...');

	await Team.remove();
	await USer.remove();

	console.log('Data Deleted');
	process.exit();
}

async function loadData() {
	console.log('Loading Sample Data...');

	try {
		await User.insertMany(users);
		await Team.insertMany(teams);

		console.log('Sample Data Loaded!');

		process.exit();
	} catch (e) {
		console.log('There was an error generating sample data!');
		console.log(e);

		process.exit();
	}
}

if (process.argv.includes('--delete')) {
	deleteData();
} else {
	loadData();
}
