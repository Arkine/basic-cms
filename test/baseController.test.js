const expect = require('chai').expect;
const should = require('chai').should();
const request = require('request');
const { config } = require('./settings');

const User = require('../src/server/models/User');

describe('BaseController unit test', () => {
	const controller =  new BaseController(User, 'user');

	it ('Test create()', (done) => {
		const data = {
			'name': 'tester name'
		};

		controller.create(data)
			.then(res => {
				res.should.have.property('name');
				res.name.should.be.a('string');
				res.name.should.equal(data.name);

				done();
			})
			.then(null, done);
	});
});