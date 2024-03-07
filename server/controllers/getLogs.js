const Changelog = require("../models/ChangeLog.schema");

const getLogs = async (req, res) => {
	try {
		const logs = await Changelog.find();
		return res.json(
			logs.map((log) => ({ id: log.id, time: log.createdAt }))
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.message);
	}
};
const getLogsByID = async (req, res) => {
	const { id } = req.user;
	try {
		const response = await Changelog.find({ userId : id});
		return res.json(response);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.message);
	}
};

module.exports = { getLogs, getLogsByID };
