const jwt = require("jsonwebtoken");
const { decrypter } = require("../utils/crypto");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	if (req.body.appAccessToken) {
		const decryptedAccessToken = decrypter(req.body.appAccessToken);
		req.body.appAccessToken = decryptedAccessToken;
	}
	try {
		if (!authHeader) return res.status(401).json({ message: "Unauthorized user" });
		const accessToken = authHeader.split(" ")[1];
		jwt.verify(accessToken, process.env.JWT_SECRET, (error, decoded) => {
			if (error) {
				res.status(403).json({ message: "Invalid Request" });
				return;
			}
			req.user = { ...decoded };
			next();
		});
	} catch (error) {
		console.log(error);
		res.json({ error: error });
	}
};

module.exports = verifyJWT;
