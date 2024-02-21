const express = require("express");
const {
	fetchMerchantConfig,
	fetchAppConfig,
	fetchStringConfig,
} = require("../controllers/getData.js");

const router = express.Router();

router.post("/fetchMerchantData", fetchMerchantConfig);
router.post("/fetchAppData", fetchAppConfig);
router.post("/fetchStringData", fetchStringConfig);

module.exports = router;
