const axios = require("../utils/axios");

const fetchAppConfig = async (req, res) => {
	const { pid, appAccessToken } = req.body;
	try {
		await axios
			.get(`/config/app?pid=${pid}`, {
				headers: {
					SWYM_MERCHANT_API_KEY: appAccessToken,
				},
			})
			.then((response) => {
				const functionalDetails = {
					pid: response?.data?.[0]?.pid,
					shopDomain:response?.data?.[0]?.shopDomain,
					eventTypes: response?.data?.[0]?.eventTypes,
					featuresEnabled: response?.data?.[0]?.featuresEnabled,
				};
				return res.json(functionalDetails);
			})
			.catch((error) => {
				return res.status(401).json(error);
			});
	} catch (error) {
		return console.log(error.message);
	}
};
const editAppConfig = async (req, res) => {
	const { pid, appAccessToken, payload } = req.body;
	try {
		await axios
			.put(`/config/app?pid=${pid}`, payload, {
				headers: {
					SWYM_MERCHANT_API_KEY: appAccessToken,
				},
			})
			.then((response) => {
				const functionalDetails = {
					pid: response?.data?.[0]?.pid,
					shopDomain: response?.data?.[0]?.shopDomain,
					eventTypes: response?.data?.[0]?.eventTypes,
					featuresEnabled: response?.data?.[0]?.featuresEnabled,
				};
				return res.json(functionalDetails);
			})
			.catch((error) => {
				console.log(error);
				return res.status(401).json(error);
			});
	} catch (error) {
		return console.log(error.message);
	}
};
module.exports = {
	fetchAppConfig,
	editAppConfig,
};
