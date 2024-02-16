const { queryFromPostgres } = require("../utils/dbConfig");

const getTokenFromShopDomain = async (req, res) => {
	const { shopDomain } = req.body;
	const val = await MerchantConfig.findAll({
		attributes: ["pid", "shopDomain", "shopName", "appAccessToken"],
		where: {
			shopDomain: {
				[Sequelize.Op.like]: `%${query}%`,
			},
		},
	});
	const rows = await queryFromPostgres(shopDomain);
	res.json(rows);
};

module.exports = { getTokenFromShopDomain };
