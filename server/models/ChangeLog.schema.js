const mongoose = require("mongoose");

const ChangelogSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			require: true,
		},
		userName: {
			type: String,
			require: true,
		},
		pid: {
			type: String,
			require: true,
		},
		payload: {
			type: String,
		},
		method: {
			type: String,
			require: true,
		},
		endPoint: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);

const Changelog = mongoose.model("changelog", ChangelogSchema);

module.exports = Changelog;
