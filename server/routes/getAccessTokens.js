const express = require("express");
const { getTokenFromShopDomain } = require("../controllers/getAccessTokens");

const router = express.Router();

router.post("/getTokenFromShopDomain", getTokenFromShopDomain);

module.exports = router;
