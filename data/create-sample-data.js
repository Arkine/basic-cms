require('dotenv').config({ path: __dirname + '/../env/variables.env' });
const fs = require('fs');
const faker = require('faker');
const path = require('path');
const slug = require('slugs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

// import all of our models - they need to be imported only once
const User = require('../src/server/models/User');
const Team = require('../src/server/models/Team');
const Event = require('../src/server/models/Event');

const Seedr = require('mongoose-seedr');

function seed() {
	console.log('seeding...');

	const users = path.join(__dirname, 'users.json');
	const teams = path.join(__dirname, 'teams.json');
	const events = path.join(__dirname, 'events.json');

	const seed = new Seedr({
		dbUrl: process.env.DATABASE,
		seed: [
			{
				documents: users,
				collection: 'users'
			},
			{
				documents: teams,
				collection: 'teams'
			},
			{
				documents: events,
				collection: 'events'
			}
		]
	});

}

async function deleteData() {
	console.log('Deleting Sample Data...');

	try {
		await Team.remove().then(res => {
			console.log(res);
		});

		await User.remove().then(res => {
			console.log(res);
		});

		await Event.remove().then(res => {
			console.log(res);
		});
	} catch (err) {
		throw new Error(err);
	}

	console.log('Data Deleted');
	process.exit();
}

function createData() {
	console.log('Generating Data...');

	const usersArr = [];
	const teamsArr = [];
	const eventsArr = [];

	const itemsCount = 15;

	for (let i = 0; i < itemsCount; i++) {
		const user = new Object();
		user.email = faker.internet.email();
		user.username = faker.internet.userName();
		user.created = faker.date.past();
		user.lastLogin = faker.date.past();
		user.photo = faker.image.animals();
		user.team = undefined;

		usersArr.push(user);

		const team = new Object();
		team.name = faker.company.companyName();
		team.created = faker.date.past();
		team.owner = "5ac2570dabea552aba2c22a2"; // Tester@test objecid
		team.photo = faker.image.city();
		team.description = faker.lorem.paragraphs();
		team.wins = faker.random.number();
		team.losses = faker.random.number();
		team.members = ["5ac2570dabea552aba2c22a2"];

		teamsArr.push(team);


		const event = new Object();
		event.title = faker.lorem.sentence();
		event.author = "5ac2570dabea552aba2c22a2",
		event.created = faker.date.past();
		event.description = faker.lorem.paragraphs();
		event.photo = faker.image.cats();

		eventsArr.push(event);
	}
	try {
		console.log('Writing data...');
		fs.writeFileSync(__dirname + '/users.json', JSON.stringify(usersArr, null, 2), 'utf8');
		fs.writeFileSync(__dirname + '/teams.json', JSON.stringify(teamsArr, null, 2), 'utf8');
		fs.writeFileSync(__dirname + '/events.json', JSON.stringify(eventsArr, null, 2), 'utf8');

		process.exit();
	} catch (e) {
		console.log('There was an err creating sample data', e);
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
	seed();
}
