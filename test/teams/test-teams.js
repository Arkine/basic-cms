const expect = require('chai').expect;
const should = require('chai').should();
const request = require('request');
const host = 'http://localhost:3000';

const Team = require('../../src/server/models/Team');

describe('Teams page', () => {
	it ('status is 200', (done) => {
		request(`${host}/teams`, (err, res, body) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

	it ('Should be a string', (done) => {
		request.get(`${host}/teams`, (err, res, body) => {
			body.should.be.a('string');

			done();
		});
	});
});