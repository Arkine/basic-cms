const expect = require('chai').expect;
const request = require('request');
const host = 'http://localhost:3000';

describe('Home Page', () => {
	it ('status is 200', (done) => {
		request(`${host}/`, (err, res, body) => {
			if (err) console.log(err);

			expect(res.statusCode).to.equal(200);
			done();
		});
	});

});
