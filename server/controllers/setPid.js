const PidMap = require("../models/Map.schema");

const setPid = async (req, res) => {
	const { pid, accessToken, canAccess, storeUrl, storeName } = req.body;
	const userEmail = req.user.email;

	const pidDetails = await PidMap.findOne({ pid: pid });
	if (pidDetails) {
		if (accessToken) {
			await PidMap.updateOne(
				{ _id: pidDetails.id },
				{ $set: { accessToken: accessToken, updatedBy: userEmail } }
			);
		}
		if (canAccess) {
			await PidMap.updateOne(
				{ _id: pidDetails.id },
				{ $set: { canAccess: canAccess, updatedBy: userEmail } }
			);
		}
		if (storeName) {
			await PidMap.updateOne(
				{ _id: pidDetails.id },
				{ $set: { storeName: storeName, updatedBy: userEmail } }
			);
		}
		if (storeUrl) {
			await PidMap.updateOne(
				{ _id: pidDetails.id },
				{ $set: { storeUrl: storeUrl, updatedBy: userEmail } }
			);
		}
		return res.json({ message: "Updation successful" });
	}
	await PidMap.create({
		pid: pid,
		accessToken: accessToken,
		canAccess: canAccess,
		storeName: storeName,
		storeUrl: storeUrl,
		updatedBy: userEmail,
	});
	return res.json({ message: "Creation successful" });
};

const getTokenFromPid = async (req, res) => {
	const userEmail = req.user.email;
	const { pid, storeUrl, storeName } = req.body;
	let pidDetails = null;

	if (pid) pidDetails = await PidMap.findOne({ pid: pid });
	if (storeName) pidDetails = PidMap.findOne({ storeName: storeName });
	if (storeUrl) pidDetails = PidMap.findOne({ storeUrl: storeUrl });

	if (pidDetails) {
		await PidMap.updateOne({ pip: pid }, { $push: { accessStack: userEmail } });
		return res.json({
			token: pidDetails.accessToken,
			storeName: pidDetails.storeName,
			storeUrl: pidDetails.storeUrl,
		});
	}
	return res.status(400).json("No Such store found");
};

module.exports = { setPid , getTokenFromPid};
