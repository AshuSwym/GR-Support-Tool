const User = require("../models/User.schema");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const userDetails = await User.findOne({ email }).catch((error) =>
			console.log(`Error with User models: ${error}`)
		);
		if (!userDetails) {
			return res.status(400).json({ message: "User not found" });
		}
		if (userDetails.password !== password) {
			return res
				.status(400)
				.json({ message: "Invalid Email or Password" });
		}
		const jwtToken = jwt.sign(
			{
				id: userDetails.id,
				email: userDetails.email,
				role: userDetails.role,
				name: userDetails.name,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "2h" }
		);

		res.json({
			message: `Welcome back! ${userDetails.name}`,
			token: jwtToken,
			email: userDetails.email,
			role: userDetails.role,
			name: userDetails.name,
		});
	} catch (error) {
		console.log(`Error with logging in: ${error}`);
	}
};

const register = async (req, res) => {
	console.log(req.body);
	const { name, role, email, password } = req.body;
	try {
		const userDetails = await User.findOne({ where: { email } }).catch(
			(error) => console.log(`Error with User models: ${error}`)
		);
		if (userDetails) {
			return res.status(400).json({ message: "User already exists" });
		}
		await User.create({ name, role, email, password });

		res.json({
			message: `Thanks for registering! ${name}`,
		});
	} catch (error) {
		console.log(`Error with logging in: ${error}`);
	}
};

module.exports = { login, register };
