const expect = require('chai').expect;
const request = require('request');
const { config } = require('../settings');

describe('Home Page', () => {
	it ('status is 200', (done) => {
		request(`${config.host}/`, (err, res, body) => {
			if (err) console.log(err);

			expect(res.statusCode).to.equal(200);
			done();
		});
	});

});
