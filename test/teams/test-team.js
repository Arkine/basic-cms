const expect = require('chai').expect;
const request = require('request');
const host = 'http://localhost:3000';

const Team = require('../../src/server/models/Team');

describe('Team tests', () => {
	describe('Page GET requests', () => {
		it('status is 200', (done) => {
			request(`${host}/teams/hoeger-block-and-donnelly`, (err, res, body) => {
				if (err) console.log(err);

				expect(res.statusCode).to.equal(200);
				done();
			});
		});


		it('resp is 404', (done) => {
			request(`${host}/teams/hoeger-block-andasdsaadsd`, (err, res, body) => {
				if (err) console.log(err);

				expect(res.statusCode).to.equal(404);
				done();
			})
		});
	});

	describe('CRUD Ops', () => {
		describe('Create Team', () => {
			it('Forbid and redirect to login if not authenticated', (done) => {
				// const team = new Team();

				request.post(`${host}/teams/create`, {}, (err, res, body) => {
					if (err) console.log(err);
					console.log(res.toJSON())

					expect(res.statusCode).to.equal(401);
					expect('Location', '/login');

					done();
				});
			});
		});
	});


});
