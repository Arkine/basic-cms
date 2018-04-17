const expect = require('chai').expect;
const should = require('chai').should();
const request = require('request');
const { config } = require('../settings');

const Team = require('../../src/server/models/Team');

describe('Teams page', () => {
	it ('status is 200', (done) => {
		request(`${config.host}/teams`, (err, res, body) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

	it ('Should be a string', (done) => {
		request.get(`${config.host}/teams`, (err, res, body) => {
			body.should.be.a('string');

			done();
		});
	});
});