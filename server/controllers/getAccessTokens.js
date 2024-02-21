const { encrypter } = require("../utils/crypto");
const { getMerchantConfig } = require("../utils/dbConfig");

const getTokenFromShopDomain = async (req, res) => {
	const { shopDomain } = req.body;
	const val = await getMerchantConfig(shopDomain);
	const enc = val.map( row => {
		return {
			...row.dataValues,
			appAccessToken: encrypter(row.appAccessToken),
		};
	})
	res.json(enc);
};

module.exports = { getTokenFromShopDomain };
