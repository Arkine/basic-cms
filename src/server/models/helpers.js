const slug = require('slugs');

exports.checkUniqueSlug = async function(next) {
	if (!this.isModified('name')) {
		return next(); // skip it
	}

	this.slug = slug(this.name);
	
	// Find other teams with same name to reduce slug collision
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');

	const itemsWithSlug = await this.constructor.find({ slug: slugRegEx });
	
	if (itemsWithSlug.length) {
		this.slug = `${this.slug}-${itemsWithSlug.length + 1}`;
	}

	next();
};