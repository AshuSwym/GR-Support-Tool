const express = require("express");
const { fetchAppConfig, editAppConfig } = require("../controllers/editAppConfig");

const router = express.Router();

router.post("/getAppConfig", fetchAppConfig);
router.post("/editAppConfig", editAppConfig);


module.exports = router;
