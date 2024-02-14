const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	try {
		if (!authHeader) res.status(401).json({ message: "Unauthorized user" });
		const accessToken = authHeader.split(" ")[1];
		jwt.verify(accessToken, process.env.JWT_SECRET, (error, decoded) => {
			if (error) {
				res.status(403).json({ message: "Invalid Request" });
				return;
			}
			req.user = {...decoded};
			next();
		});
	} catch (error) {
		console.log(error);
		res.json({ error: error });
	}
};

module.exports = verifyJWT;