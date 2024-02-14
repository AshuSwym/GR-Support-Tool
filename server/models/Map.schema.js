const mongoose = require("mongoose");

const PIDMapSchema = new mongoose.Schema(
	{
		storeName: {
			type: String,
			require: true,
		},
		storeUrl: {
			type: String,
			require: true,
		},
		pid: {
			type: String,
			require: true,
			unique: true,
		},
		accessToken: {
			type: String,
			require: true,
			unique: true,
		},
		canAccess: [
			{
				type: String,
				require: true,
			},
		],
		updatedBy: {
			type: String,
			require: true,
		},
		accessStack: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

const PidMap = mongoose.model("pidmap", PIDMapSchema);

module.exports = PidMap;