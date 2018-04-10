const AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY
});
const s3 = new AWS.S3();
const multer = require('multer');
const multerS3 = require('multer-s3');

const upload = multer({
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if (isPhoto) {
			next(null, true);
		} else {
			next({ message: 'That file type isn\'t allowed' } , false);
		}
	},
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_BUCKET_NAME,
		metaData: (req, file, cb) => {
			cb(null, { fieldName: file.fieldName })
		},
		key: (req, file, cb) => {
			cb(null, Date.now().toString())
		}
	})
});

module.exports = upload;