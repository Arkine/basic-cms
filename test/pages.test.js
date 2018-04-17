const expect = require('chai').expect;
const request = require('request');
const { config } = require('./settings');
// const host = 'http://localhost:7777';


describe('General tests', () => {
	it('Should return a 404 for wrong page', (done) => {
		request(`${config.host}/asdasjd`, (err, res, body) => {
			expect(res.statusCode).to.equal(404);

			done();
		});
	});
});