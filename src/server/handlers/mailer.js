import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';
import util from 'util';

const promisify = util.promisify;
require('util.promisify').shim();

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
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

exports.send = async (options) => {
	const html = generateHTML(options.filename, options);
	const text = htmlToText.fromString(html);

	const mailOptions = {
		from: `noreply@ovw.com`,
		subject: options.subject,
		to: options.user.email,
		html,
		text
	};

	transport.sendMail(mailOptions)
		.then(results => {
			console.log(results);
			return results;
		})
		.catch(err => {
			console.error('there was an error sending mail', err);
		});
};
