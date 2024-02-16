const PidMap = require("../models/Map.schema");
const { queryFromPostgres } = require("../utils/dbConfig");

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

const getToken = async (req, res) => {
	const userEmail = req.user.email;
	const { pid, storeUrl, storeName } = req.body;
	let pidDetails = null;

	if (pid) pidDetails = await PidMap.findOne({ pid: pid });
	else if (storeName)
		pidDetails = await PidMap.findOne({ storeName: { $regex: storeName } });
	else if (storeUrl)
		pidDetails = await PidMap.findOne({ storeUrl: storeUrl });

	if (pidDetails) {
		pidDetails.accessStack.push({ email: userEmail });
		await pidDetails.save();
		return res.json({
			token: pidDetails.accessToken,
			storeName: pidDetails.storeName,
			storeUrl: pidDetails.storeUrl,
		});
	}
	return res.status(400).json("No Such store found");
};

const getTokenFromPid = async (req, res) => {
	const userEmail = req.user.email;
	const { pid, storeUrl, storeName } = req.body;
	const query = `SELECT "shopDomain", "adminApiAccessToken", "shopName", scopes, "storefrontApiAccessToken", "clientAppId", "clientAppSecret", "shopOwner", "platformShopObject", "currencyFormat", "appAccessToken"
					FROM "Gift Registry"."MerchantConfig" where "shopName" like '${storeName}%';`;
	res.json(queryFromPostgres(query));
};

module.exports = { setPid, getTokenFromPid, getToken };
