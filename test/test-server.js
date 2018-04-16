const chai = require('chai');
const chaiHttp = require('chai-http');
const app  = require ('../start');
const should = chai.should();

chai.use(chaiHttp);

describe('Teams', function() {
	it('should list ALL teams on /teams GET', (done) => {
		chai.request(app)
			.get('/teams')
			.end((err, res) => {
				res.should.have.status(200);

				done();
			});

	});
	it('should list a SINGLE blob on /blob/<id> GET');
	it('should add a SINGLE blob on /teams POST');
	it('should update a SINGLE team on /team/<id> PUT');
	it('should delete a SINGLE team on /team/<id> DELETE');
});