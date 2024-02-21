const { Sequelize, DataTypes, Deferrable, Op, DATE } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASS,
	{
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		dialect: "postgres",
		dialectOptions: {
			ssl: true,
		},
		logging: false,
	}
);

let checkConnection = async function () {
	try {
		await sequelize.authenticate();
		console.log("Postgres connected");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		throw error;
	}
};

const MerchantConfig = sequelize.define(
	"MerchantConfig",
	{
		pid: {
			type: DataTypes.TEXT,
			allowNull: false,
			autoIncrement: true,
		},
		shopDomain: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		platformName: {
			type: DataTypes.TEXT,
		},
		plan: {
			type: DataTypes.TEXT,
		},
		installStatus: {
			type: DataTypes.TEXT,
		},
		liveStatus: {
			type: DataTypes.TEXT,
		},
		platformShopObject: {
			type: DataTypes.JSON,
		},
		shopOwner: {
			type: DataTypes.TEXT,
		},
		email: {
			type: DataTypes.TEXT,
		},
		platformShopId: {
			type: DataTypes.TEXT,
		},
		shopName: {
			type: DataTypes.TEXT,
		},
		country: {
			type: DataTypes.TEXT,
		},
		currency: {
			type: DataTypes.TEXT,
		},
		currencyFormat: {
			type: DataTypes.TEXT,
		},
		installedAt: {
			type: DataTypes.DATE,
		},
		uninstalledAt: {
			type: DataTypes.DATE,
		},
		lastInstalledAt: {
			type: DataTypes.DATE,
		},
		lastUninstalledAt: {
			type: DataTypes.DATE,
		},
		webhooksInstalled: {
			type: DataTypes.JSON,
		},
		scopes: {
			type: DataTypes.TEXT,
		},
		adminApiAccessToken: {
			type: DataTypes.TEXT,
		},
		storefrontApiAccessToken: {
			type: DataTypes.TEXT,
		},
		clientAppId: {
			type: DataTypes.TEXT,
		},
		clientAppSecret: {
			type: DataTypes.TEXT,
		},
		appAccessToken: {
			type: DataTypes.TEXT,
		},
		platformPlanName: {
			type: DataTypes.TEXT,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "MerchantConfig",
		// Other model options go here
	}
);

const PagesConfigured = sequelize.define(
	"PagesConfigured",
	{
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
		},
		isVintageTheme: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			default: false,
		},
		platformPageId: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		initiatedBy: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		shopDomain: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		isComplete: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			default: false,
		},
		version: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		handle: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		pageName: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		themeId: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		pid: {
			type: DataTypes.TEXT,
		},
		isLive: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			default: false,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "PagesConfigured",
		// Other model options go here
	}
);

const AppConfig = sequelize.define(
	"AppConfig",
	{
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
		},
		shopDomain: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		pid: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		eventTypes: {
			type: [DataTypes.TEXT],
		},
		featuresEnabled: {
			type: DataTypes.JSON,
		},
		appLevelSettingsStatus: {
			type: DataTypes.TEXT,
		},
		pageSettingsStatus: {
			type: DataTypes.TEXT,
		},
		themeSettingsStatus: {
			type: DataTypes.TEXT,
		},
		customisePageSettingsStatus: {
			type: DataTypes.TEXT,
		},
		presentStepNumber: {
			type: DataTypes.INTEGER,
		},
		isAppSetupComplete: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "AppConfig",
		// Other model options go here
	}
);

const StringsConfig = sequelize.define(
	"StringsConfig",
	{
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
		},
		themeId: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		shopDomain: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		pid: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		globalConfig: {
			type: DataTypes.JSON,
		},
		manageRegistry: {
			type: DataTypes.JSON,
		},
		findRegistry: {
			type: DataTypes.JSON,
		},
		createRegistry: {
			type: DataTypes.JSON,
		},
		viewAsShopper: {
			type: DataTypes.JSON,
		},
		viewAsGifter: {
			type: DataTypes.JSON,
		},
		landingPage: {
			type: DataTypes.JSON,
		},
		productPage: {
			type: DataTypes.JSON,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "StringsConfig",
		// Other model options go here
	}
);

const StylesConfig = sequelize.define(
	"StylesConfig",
	{
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
		},
		themeId: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		pid: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		shopDomain: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		globalConfig: {
			type: DataTypes.JSON,
		},
		manageRegistry: {
			type: DataTypes.JSON,
		},
		findRegistry: {
			type: DataTypes.JSON,
		},
		createRegistry: {
			type: DataTypes.JSON,
		},
		viewAsShopper: {
			type: DataTypes.JSON,
		},
		viewAsGifter: {
			type: DataTypes.JSON,
		},
		landingPage: {
			type: DataTypes.JSON,
		},
		productPage: {
			type: DataTypes.JSON,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "StylesConfig",
		// Other model options go here
	}
);

const Registry = sequelize.define(
	"Registry",
	{
		Id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		registryName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		creatorName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		coCreatorName: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		expiryDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},

		associatedListId: {
			type: DataTypes.TEXT,
		},
		pid: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		settings: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		customProps: {
			type: [DataTypes.JSON],
			allowNull: true,
		},
		address: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		occasion: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		mode: {
			type: DataTypes.ENUM("public", "private", "shareable"),
			defaultValue: "private",
		},
		imageURL: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		isArchived: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "Registries",
		// Other model options go here
	}
);

const Order = sequelize.define(
	"Order",
	{
		Id: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		registryId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: Registry,
				key: "Id",
				deferrable: Deferrable.INITIALLY_IMMEDIATE,
			},
		},
		cartToken: {
			type: DataTypes.TEXT,
		},
		checkoutId: {
			type: DataTypes.TEXT,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		landingSite: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		landingSiteRef: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		referringSite: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		totalPrice: {
			type: DataTypes.DOUBLE,
		},
		orderStatusUrl: {
			type: DataTypes.TEXT,
		},
		pid: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		contactEmail: {
			type: DataTypes.TEXT,
		},
		primeShopperEmail: {
			type: DataTypes.TEXT,
		},
		note: {
			type: DataTypes.TEXT,
		},
		gifterName: {
			type: DataTypes.TEXT,
		},
		gifterEmail: {
			type: DataTypes.TEXT,
		},
		thanksSent: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		isDummy: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		orderDate: {
			type: DataTypes.DATE,
		},
		additionalProps: {
			type: DataTypes.JSON,
		},
		isTest: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "Orders",
		timestamps: false,
		// Other model options go here
	}
);

const Product = sequelize.define(
	"Product",
	{
		id: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		variantId: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		handle: {
			type: DataTypes.TEXT,
		},
		pid: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		registryId: {
			type: DataTypes.BIGINT,
			primaryKey: true,
		},
		customProps: {
			type: DataTypes.JSON,
		},
		askQuantity: {
			type: DataTypes.INTEGER,
			Default: 1,
		},
		boughtQuantity: {
			type: DataTypes.INTEGER,
			Default: 0,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "Products",
		// Other model options go here
	}
);

const Users = sequelize.define(
	"userAuth",
	{
		userEmail: {
			type: DataTypes.TEXT,
		},
		userId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		pid: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		appId: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		platformCustomerId: {
			type: DataTypes.TEXT,
			primaryKey: true,
		},
		customProps: {
			type: DataTypes.JSON,
			allowNull: true,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "userAuth",
		// Other model options go here
	}
);

const Sessions = sequelize.define(
	"Sessions",
	{
		sessionId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		userAgent: {
			type: DataTypes.TEXT,
		},
		expTime: {
			type: DataTypes.INTEGER,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "Sessions",
		// Other model options go here
	}
);

const ShopifyGdprData = sequelize.define(
	"ShopifyGdprData",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		pid: {
			type: DataTypes.TEXT,
		},
		shopDomain: {
			type: DataTypes.TEXT,
		},
		action: {
			type: DataTypes.TEXT,
		},
		isActioned: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		data: {
			type: DataTypes.JSON,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "ShopifyGdprData",
		// Other model options go here
	}
);

const ShopifyApp = sequelize.define(
	"ShopifyApp",
	{
		id: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		shop: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		state: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		isonline: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		accesstoken: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		scope: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		pid: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		giftaccesstoken: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "ShopifySessions",
	}
);

const BillingConfigHistory = sequelize.define(
	"BillingConfigHistory",
	{
		uid: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		chargeId: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		pid: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		appName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		shopDomain: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		shopId: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		platformName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		appPlan: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		eventType: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		chargeAmount: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		currencyCode: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		billingType: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		occuredAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		endAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		createdOn: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		activatedOn: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		billingOn: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		trialDays: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		test: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "BillingConfigHistory",
	}
);

const BillingConfigLatest = sequelize.define(
	"BillingConfigLatest",
	{
		chargeId: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		pid: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		appName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		shopDomain: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		shopId: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		platformName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		appPlan: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		eventType: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		chargeAmount: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		currencyCode: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		billingType: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		trialDays: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		occuredAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		endAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		createdOn: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		activatedOn: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		billingOn: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		test: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
	},
	{
		schema: "Gift Registry",
		tableName: "BillingConfigLatest",
	}
);

// const Event = sequelize.define(
// 	"Event",
// 	{
// 		id: {
// 			type: DataTypes.TEXT,
// 			allowNull: false,
// 			primaryKey: true,
// 		},
// 		pid: {
// 			type: DataTypes.TEXT,
// 		},
// 		clientId: {
// 			type: DataTypes.TEXT,
// 		},
// 		page: {
// 			type: DataTypes.TEXT,
// 		},
// 		timestamp: {
// 			type: DataTypes.DATE,
// 			allowNull: true,
// 		},
// 		context: {
// 			type: DataTypes.JSON,
// 		},
// 		userAgent: {
// 			type: DataTypes.TEXT,
// 		},
// 		source: {
// 			type: DataTypes.TEXT,
// 			defaultValue: "shopify-webpixel",
// 		},
// 		path: {
// 			type: DataTypes.TEXT,
// 		},
// 		eventAction: {
// 			type: DataTypes.TEXT,
// 		},
// 		customData: {
// 			type: DataTypes.JSON,
// 		},
// 		uri: {
// 			type: DataTypes.TEXT,
// 		},
// 	},
// 	{
// 		schema: "Gift Registry",
// 		tableName: "Events",
// 	}
// );

let getEventTypesByPid = async function (pid) {
	return await AppConfig.findOne({
		attributes: ["eventTypes"],
		where: {
			pid: pid,
		},
	});
};

let getEventTypesByShopDomain = async function (shopDomain) {
	return await AppConfig.findOne({
		attributes: ["eventTypes"],
		where: {
			shopDomain: shopDomain,
		},
	});
};

let insertGdprShopifyData = async function (gdprDataToBeInserted) {
	return await ShopifyGdprData.create(gdprDataToBeInserted);
};

let createMerchantConfig = async function (merchant) {
	const createdMerchantConfig = await MerchantConfig.upsert(merchant);
	return createdMerchantConfig;
};

let removeEntryFromApp = async function (shopDomain) {
	await ShopifyApp.destroy({
		where: {
			shop: shopDomain,
		},
	});
	await AppConfig.destroy({
		where: {
			shopDomain: shopDomain,
		},
	});
};

let updateMerchantConfig = async function (merchant, domain) {
	let updatedMerchantConfig = await MerchantConfig.update(merchant, {
		where: {
			shopDomain: domain,
		},
		returning: true,
	});
	return updatedMerchantConfig;
};

let updateMerchantConfigById = async function (merchant, pid) {
	let updatedMerchantConfig = await MerchantConfig.update(merchant, {
		where: {
			pid: pid,
		},
		returning: true,
	});
	return updatedMerchantConfig;
};

let upsertPages = async function (
	pageName,
	handle,
	title,
	initiatedBy,
	shopDomain,
	themeId,
	isComplete,
	platformPageId,
	pid,
	isVintageTheme,
	isLiveTheme,
	version = parseFloat(config.get("SWYM_PAGE_VERSION"))
) {
	let insertedPages = PagesConfigured.upsert({
		version: version,
		handle: handle,
		title: title,
		shopDomain: shopDomain,
		themeId: themeId,
		isComplete: isComplete,
		pageName: pageName,
		initiatedBy: initiatedBy,
		platformPageId: platformPageId,
		pid: pid,
		isVintageTheme: isVintageTheme,
		isLive: isLiveTheme,
	});
	return insertedPages;
};

let updatePageVersion = async function (shopDomain, themeId) {
	let pageVersionUpdate = await PagesConfigured.update(
		{
			version: parseFloat(config.get("SWYM_PAGE_VERSION")),
		},
		{
			where: {
				shopDomain: shopDomain,
				themeId: themeId,
			},
			returning: true,
		}
	);
	return pageVersionUpdate;
};

let getPagesByTheme = async function (shopDomain, themeId) {
	let filteredPages = PagesConfigured.findAll({
		where: {
			shopDomain: shopDomain,
			themeId: themeId,
		},
	});
	return filteredPages;
};

let getPagesByShop = async function (shopDomain) {
	let filteredPages = PagesConfigured.findAll({
		where: {
			shopDomain: shopDomain,
		},
	});
	return filteredPages;
};

let getPagesByShopAndPageName = async function (shopDomain, pageName) {
	let filteredPages = PagesConfigured.findAll({
		where: {
			shopDomain: shopDomain,
			pageName: pageName,
		},
	});
	return filteredPages;
};

let getLivePagesByShopDomain = async function (shopDomain, isLive) {
	let livePages = PagesConfigured.findAll({
		where: {
			shopDomain: shopDomain,
			isLive: isLive,
		},
	});
	return livePages;
};

let getPagesByThemeId = async function (shopDomain, themeId) {
	let livePages = PagesConfigured.findAll({
		where: {
			shopDomain: shopDomain,
			themeId: themeId,
		},
	});
	return livePages;
};

let updatePagesConfigured = async function (pagesConfig, shopDomain, themeId) {
	let updatedPagesConfig = await PagesConfigured.update(pagesConfig, {
		where: {
			shopDomain: shopDomain,
			themeId: themeId,
		},
		returning: true,
	});
	return updatedPagesConfig;
};

let removePageConfigured = async function (shopDomain, themeId) {
	await PagesConfigured.destroy({
		where: {
			shopDomain: shopDomain,
			themeId: themeId,
		},
	});
};

let getMerchantConfig = async function (domain) {
	let filteredConfig = await MerchantConfig.findAll({
		attributes: ["pid", "shopDomain", "shopName", "appAccessToken"],
		where: {
			shopDomain: {
				[Sequelize.Op.like]: `%${domain}%`,
			},
		},
	});
	return filteredConfig;
};

let getMerchantConfigById = async function (pid) {
	let filteredConfig = await MerchantConfig.findAll({
		where: {
			pid: pid,
		},
	});
	return filteredConfig;
};

let createAppConfig = async function (appConfig) {
	const createdAppConfig = await AppConfig.upsert(appConfig);
	return createdAppConfig;
};

let getMerchantAccessTokenById = async function (pid) {
	return await MerchantConfig.findOne({
		attributes: ["appAccessToken"],
		where: {
			pid: pid,
			installStatus: "installed",
		},
	});
};
let getMerchantByShopDomain = async function (shopDomain) {
	return await MerchantConfig.findOne({
		where: {
			shopDomain: shopDomain,
		},
	});
};

let updateAppConfig = async function (appConfig, domain) {
	let updatedAppConfig = await AppConfig.update(appConfig, {
		where: {
			shopDomain: domain,
		},
		returning: true,
	});
	return updatedAppConfig;
};

let updateAppConfigById = async function (appConfig, pid) {
	let updatedAppConfig = await AppConfig.update(appConfig, {
		where: {
			pid: pid,
		},
		returning: true,
	});
	return updatedAppConfig;
};

let getAppConfig = async function (domain) {
	let filteredConfig = await AppConfig.findAll({
		where: {
			shopDomain: domain,
		},
	});
	return filteredConfig;
};

let getAppConfigById = async function (pid) {
	let filteredConfig = await AppConfig.findAll({
		where: {
			pid: pid,
		},
	});
	return filteredConfig;
};

let createStringsConfig = async function (stringsConfig) {
	const createdStringsConfig = await StringsConfig.upsert(stringsConfig);
	return createdStringsConfig;
};

let updateStringsConfig = async function (stringsConfig, domain, themeId) {
	let updatedStringsConfig = await StringsConfig.update(stringsConfig, {
		where: {
			shopDomain: domain,
			themeId: themeId,
		},
		returning: true,
	});
	return updatedStringsConfig;
};

let updateStringsConfigById = async function (stringsConfig, pid, themeId) {
	let updatedStringsConfig = await StringsConfig.update(stringsConfig, {
		where: {
			pid: pid,
			themeId: themeId,
		},
		returning: true,
	});
	return updatedStringsConfig;
};

let getStringsConfig = async function (domain, themeId) {
	let filteredConfig = await StringsConfig.findAll({
		where: {
			shopDomain: domain,
			themeId: themeId,
		},
	});
	return filteredConfig;
};

let getStringsConfigById = async function (pid, themeId) {
	let filteredConfig = await StringsConfig.findAll({
		where: {
			pid: pid,
			themeId: themeId,
		},
	});
	return filteredConfig;
};

let createStylesConfig = async function (stylesConfig) {
	const createdStylesConfig = await StylesConfig.upsert(stylesConfig);
	return createdStylesConfig;
};

let updateStylesConfig = async function (stylesConfig, domain, themeId) {
	let updatedStylesConfig = await StylesConfig.update(stylesConfig, {
		where: {
			shopDomain: domain,
			themeId: themeId,
		},
		returning: true,
	});
	return updatedStylesConfig;
};

let updateStylesConfigById = async function (stylesConfig, pid, themeId) {
	let updatedStylesConfig = await StylesConfig.update(stylesConfig, {
		where: {
			pid: pid,
			themeId: themeId,
		},
		returning: true,
	});
	return updatedStylesConfig;
};

let createBillingConfigHistory = async function (billingData) {
	const createdBillingConfigHistory = await BillingConfigHistory.upsert(
		billingData
	);
	return createdBillingConfigHistory;
};

let getBillingConfigHistory = async function (pid) {
	let result = await BillingConfigHistory.findAll({
		where: {
			pid: pid,
		},
		order: [["createdAt", "ASC"]],
	});
	let subscriptions = [];
	result.forEach((e) => {
		subscriptions.push(e.dataValues);
	});
	return subscriptions;
};

let createBillingConfigLatest = async function (billingData) {
	const createdBillingConfigLatest = await BillingConfigLatest.upsert(
		billingData
	);
	return createdBillingConfigLatest;
};

let getBillingConfigLatest = async function (pid) {
	let result = await BillingConfigLatest.findAll({
		where: {
			pid: pid,
		},
	});
	if (result[0]) {
		let subscriptions = [];
		subscriptions.push(result[0]?.dataValues);
		return subscriptions;
	}
};

let getStylesConfig = async function (domain, themeId) {
	let filteredConfig = await StylesConfig.findAll({
		where: {
			shopDomain: domain,
			themeId: themeId,
		},
	});
	return filteredConfig;
};

let getStylesConfigById = async function (pid, themeId) {
	let filteredConfig = await StylesConfig.findAll({
		where: {
			pid: pid,
			themeId: themeId,
		},
	});
	return filteredConfig;
};

let getShopName = async function (pid) {
	let result = await MerchantConfig.findOne({
		attributes: ["shopDomain"],
		where: {
			pid: pid,
		},
	});
	return result.dataValues.shopDomain;
};

let getAllOrdersForDateRange = async function (
	pid,
	startDate,
	endDate,
	pageSize,
	pageNumber
) {
	let orders = await Order.findAndCountAll({
		offset: pageNumber * pageSize,
		limit: pageSize,
		where: {
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
			pid: pid,
		},
	});
	let finalResult = {
		totalResultsCount: orders.count,
		results: orders.rows,
		page: parseInt(pageNumber),
		totalPageCount: Math.ceil(orders.count / pageSize),
	};
	return finalResult;
};

let getAllRegistriesForDateRange = async function (
	pid,
	startDate,
	endDate,
	pageSize,
	pageNumber
) {
	let registries = await Registry.findAndCountAll({
		offset: pageNumber * pageSize,
		limit: pageSize,
		where: {
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
			pid: pid,
			isArchived: false,
		},
	});
	let finalResult = {
		totalResultsCount: registries.count,
		results: registries.rows,
		page: parseInt(pageNumber),
		totalPageCount: Math.ceil(registries.count / pageSize),
	};

	return finalResult;
};

let getGeneratedRevenueForDateRange = async function (pid, startDate, endDate) {
	let revenueGenerated = await Order.sum("totalPrice", {
		where: {
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
			pid: pid,
		},
	});
	return revenueGenerated;
};

let getTotalNumberOfRegistriesForDateRange = async function (
	pid,
	startDate,
	endDate
) {
	let totalRegistries = Registry.count({
		where: {
			pid: pid,
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
			isArchived: false,
		},
	});
	return totalRegistries;
};

let getTotalNumberOfOrdersForDateRange = async function (
	pid,
	startDate,
	endDate
) {
	let totalOrders = Order.count({
		where: {
			pid: pid,
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
		},
	});
	return totalOrders;
};

let getTotalNumberOfProductsForDateRange = async function (
	pid,
	startDate,
	endDate
) {
	let totalProducts = Product.count({
		where: {
			pid: pid,
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
		},
	});
	return totalProducts;
};

let getTotalNumberOfBoughtProductsForDateRange = async function (
	pid,
	startDate,
	endDate
) {
	let totalProducts = Product.sum("boughtQuantity", {
		where: {
			pid: pid,
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
		},
	});
	return totalProducts;
};

let getTotalNumberOfListedProductsForDateRange = async function (
	pid,
	startDate,
	endDate
) {
	let totalProducts = Product.sum("askQuantity", {
		where: {
			pid: pid,
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
		},
	});
	return totalProducts;
};

let getTotalNumberOfUsersForDateRange = async function (
	pid,
	startDate,
	endDate
) {
	let totalUsers = Users.count({
		where: {
			pid: pid,
			createdAt: {
				[Op.between]: [startDate, endDate],
			},
		},
	});
	return totalUsers;
};

let getDailyRevenueForADateRange = async function (pid, startDate, endDate) {
	const dailyRevenue = await Order.findAll({
		attributes: [
			"orderDate",
			[sequelize.fn("sum", sequelize.col("totalPrice")), "revenue"],
		],
		group: ["orderDate", "pid"],
		having: {
			pid: pid,
			orderDate: {
				[Op.between]: [startDate, endDate],
			},
		},
	});

	return dailyRevenue;
};

let getMerchantAppSecret = async function (shopDomain) {
	return await MerchantConfig.findOne({
		attributes: ["clientAppSecret"],
		where: {
			shopDomain: shopDomain,
		},
	});
};

let getAllPageInstallData = async function () {
	let merchantData = [];
	const pageData = await PagesConfigured.findAll({
		attributes: ["shopDomain", "themeId", "pageName", "pid"],
	});
	for (let item of pageData) {
		const appAccessToken = await getMerchantAccessTokenById(item.pid);
		if (appAccessToken && appAccessToken.appAccessToken) {
			item.dataValues.appAccessToken = appAccessToken.appAccessToken;
			merchantData.push(item);
		}
	}
	return merchantData;
};

// let upsertEvents = async function (event) {
// 	return await Event.upsert(event);
// };

module.exports = {
	checkConnection,
	getEventTypesByPid,
	getEventTypesByShopDomain,
	getShopName,
	getStylesConfig,
	getStylesConfigById,
	updateStylesConfig,
	updateStylesConfigById,
	createMerchantConfig,
	createStylesConfig,
	getStringsConfig,
	updateStringsConfig,
	updateStringsConfigById,
	createBillingConfigHistory,
	getBillingConfigHistory,
	createBillingConfigLatest,
	getBillingConfigLatest,
	getStringsConfigById,
	createStringsConfig,
	getAppConfig,
	getAppConfigById,
	updateAppConfig,
	updateAppConfigById,
	createAppConfig,
	getMerchantConfig,
	updateMerchantConfig,
	updateMerchantConfigById,
	getPagesByTheme,
	getPagesByShop,
	upsertPages,
	getMerchantConfigById,
	getMerchantAccessTokenById,
	getAllOrdersForDateRange,
	getAllRegistriesForDateRange,
	getGeneratedRevenueForDateRange,
	getTotalNumberOfRegistriesForDateRange,
	getTotalNumberOfProductsForDateRange,
	getTotalNumberOfUsersForDateRange,
	getTotalNumberOfBoughtProductsForDateRange,
	getTotalNumberOfListedProductsForDateRange,
	getTotalNumberOfOrdersForDateRange,
	getDailyRevenueForADateRange,
	getMerchantAppSecret,
	getMerchantByShopDomain,
	insertGdprShopifyData,
	removeEntryFromApp,
	getAllPageInstallData,
	getPagesByShopAndPageName,
	updatePagesConfigured,
	getLivePagesByShopDomain,
	removePageConfigured,
	getPagesByThemeId,
	updatePageVersion,
};
