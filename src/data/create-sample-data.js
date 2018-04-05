require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');
const faker = require('faker');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

// import all of our models - they need to be imported only once
const User = require('../server/models/User');
const Team = require('../server/models/Team');

async function deleteData() {
	console.log('Deleting Sample Data...');

	await Team.remove();
	await User.remove();

	console.log('Data Deleted');
	process.exit();
}

function createData() {
	console.log('Generating Data...');

	const usersArr = [];
	const teamsArr = [];

	const itemsCount = 15;

	for (let i = 0; i < itemsCount; i++) {
		const user = new Object();

		user.email = faker.internet.email();
		user.username = faker.internet.userName();
		user.createdAt = faker.date.past();
		user.lastLogin = faker.date.past();
		user.thumbnail = faker.image.animals();
		user.team = undefined;

		usersArr.push(user);

		const team = new Object();

		team.name = faker.company.companyName();
		team.createdAt = faker.date.past();
		team.owner = "5ac2570dabea552aba2c22a2";
		team.thumbnail = faker.image.city();
		team.description = faker.lorem.paragraphs();
		team.wins = faker.random.number();
		team.losses = faker.random.number();
		team.members = ["5ac2570dabea552aba2c22a2"];

		teamsArr.push(team);
	}
	try {
		console.log('Writing data...');
		fs.writeFileSync(__dirname + '/users.json', JSON.stringify(usersArr, null, 2), 'utf8');
		fs.writeFileSync(__dirname + '/teams.json', JSON.stringify(teamsArr, null, 2), 'utf8');

		process.exit();
	} catch (e) {
		console.log('There was an err creating sample data', e);
		process.exit();
	}

}

async function loadData() {
	console.log('Loading Sample Data...');

	const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf8'));
	const teams = JSON.parse(fs.readFileSync(__dirname + '/teams.json', 'utf8'));

	try {
		await User.insertMany(users);
		await Team.insertMany(teams);

		console.log('Sample Data Loaded!');

		process.exit();
	} catch (e) {
		console.log('There was an error loading sample data!');
		console.log(e);

		process.exit();
	}
}

if (process.argv.includes('--delete')) {
	deleteData();
}

if (process.argv.includes('--create')) {
	createData();
}

if (process.argv.includes('--load')) {
	loadData();
}
