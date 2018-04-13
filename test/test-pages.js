const expect = require('chai').expect;
const request = require('request');
const host = 'http://localhost:3000';

describe('General tests', () => {
	it('Should return a 404 for wrong page', (done) => {
		request(`${host}/asdasjd`, (err, res, body) => {
			expect(res.statusCode).to.equal(404);

			done();
		});
	});
});