const express = require("express");
const { getTokenFromShopDomain } = require("../controllers/setPid");

const router = express.Router();

router.post("/getTokenFromShopDomain", getTokenFromShopDomain);

module.exports = router;
