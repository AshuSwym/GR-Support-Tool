const mongoose = require("mongoose");

const ChangeLog = new mongoose.Schema(
	{
		id: {
			type: String,
			require
		},
	},
	{ timestamps: true }
);

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		role: {
			type: String,
			require: true,
		},
		changeLogs: {
			type: [ChangeLog],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;