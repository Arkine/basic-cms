const viewsRoot = 'admin'
exports.dashboard = (req, res, next) => {
	res.render(`${viewsRoot}/dashboard`, {
		title: "Dashboard"
	});
};