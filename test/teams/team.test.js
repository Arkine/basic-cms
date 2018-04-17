const expect = require('chai').expect;
const request = require('request');
const { config } = require('../settings');

const Team = require('../../src/server/models/Team');
const User = require('../../src/server/models/User');

describe('Team tests', () => {
	describe('Page GET requests', () => {
		it('status is 200', (done) => {
			request(`${config.host}/teams/hoeger-block-and-donnelly`, (err, res, body) => {
				if (err) console.log(err);

				expect(res.statusCode).to.equal(200);
				done();
			});
		});


		it('resp is 404', (done) => {
			request(`${config.host}/teams/hoeger-block-andasdsaadsd`, (err, res, body) => {
				if (err) console.log(err);

				expect(res.statusCode).to.equal(404);
				done();
			})
		});
	});

	describe('CRUD Ops', () => {
		describe('Create Team', () => {

			it('Forbid and redirect to login if not authenticated', (done) => {
				request.post(`${config.host}/teams/create`, {}, (err, res, body) => {
					if (err) console.log(err);
					// console.log(res.toJSON())

					expect(res.statusCode).to.equal(302);
					expect('Location', '/login');

					done();
				});
			});

			it('Should return string and be on the team page if logged in', (done) => {
				const authenticatedUser = request.agent(app);
				const user = {
					email: 'tester@test.com',
					password: 'test'
				};
				const team = new Team({
					name: 'winners'
				});

				request.post(`${config.host}/teams/create`, {user, team}, (err, res, body) => {
					if (err) console.log(err);
					// console.log(res.toJSON());
					expect(res.statusCode).toEqual(200);
					// expect('Location', '')

					done();
				});
			})
		});
	});


});
