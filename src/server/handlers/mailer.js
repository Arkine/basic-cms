const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	post: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const generateHTML = (filename, options = {}) => {
	const html = pug.renderFile(`${__dirname}/../../common/views/email/${filename}.pug`, options);

	const inlined = juice(html);

	return inlined;
}