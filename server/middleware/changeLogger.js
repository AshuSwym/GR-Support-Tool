const Changelog = require("../models/ChangeLog.schema");
const User = require("../models/User.schema");

const changeLogger = async (req, res, next) => {
	const { pid } = req.body;
	const { id, name } = req.user;
	const { url, method } = req;
	console.log(url, method);
	console.log(`${name} used ${method} on ${url}`);

	try {
		const user = await User.findOne({ _id: id });
		Promise.resolve(
			Changelog.create({
				userId: id,
				userName: name,
				pid: pid,
				payload: JSON.stringify(req.body),
				endPoint: url,
				method: method,
			})
		).then(async (res) => {
			user.changeLogs.push(res._id);
			await user.save();
			next();
		});
	} catch (error) {
		console.log(error);
		res.json({ error: error });
	}
};

module.exports = changeLogger;
