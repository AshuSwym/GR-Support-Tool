const express = require("express");
const { setPid, getTokenFromPid, getToken } = require("../controllers/setPid");

const router = express.Router();

router.post("/setPid", setPid);
router.post("/getToken", getToken);
router.post("/getTokenFromPID", getTokenFromPid);

module.exports = router;
