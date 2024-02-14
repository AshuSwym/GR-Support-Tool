const express = require("express");
const { setPid, getTokenFromPid } = require("../controllers/setPid");

const router = express.Router();

router.post("/setPid", setPid);
router.post("/getToken", getTokenFromPid);

module.exports = router;
