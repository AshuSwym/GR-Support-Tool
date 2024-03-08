const express = require("express");
const { getLogs, getLogsByID } = require("../controllers/getLogs");
const verifyJWT = require("../middleware/verifyJwt");

const router = express.Router();

router.get("/getLogs", getLogs);
router.use(verifyJWT);
router.post("/getLogs", getLogsByID);

module.exports = router;
