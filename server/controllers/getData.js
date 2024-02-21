const axios = require("../utils/axios");

const fetchMerchantConfig = async (req, res) => {
	const { pid, appAccessToken } = req.body;
	try {
		await axios
			.get(`/platform/merchant?pid=${pid}`, {
				headers: {
					SWYM_MERCHANT_API_KEY: appAccessToken,
				},
			})
			.then((response) => res.json(response.data))
			.catch((error) => res.json(error.message));
	} catch (error) {
		console.log(error.message);
	}
};

const fetchAppConfig = async (req, res) => {
	const { pid, appAccessToken } = req.body;
	try {
		await axios
			.get(`/config/app?pid=${pid}`, {
				headers: {
					SWYM_MERCHANT_API_KEY: appAccessToken,
				},
			})
			.then((response) => res.json(response.data))
			.catch((error) => res.json(error.message));
	} catch (error) {
		console.log(error.message);
	}
};

const fetchStringConfig = async (req, res) => {
	const { pid, themeId, appAccessToken } = req.body;
	try {
		await axios
			.get(`/config/strings?themeId=${themeId}&pid=${pid}`, {
				headers: {
					SWYM_MERCHANT_API_KEY: appAccessToken,
				},
			})
			.then((response) => res.json(response.data))
			.catch((error) => res.json(error.message));
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { fetchMerchantConfig, fetchAppConfig, fetchStringConfig };
