const swaggerJsDoc = require("swagger-jsdoc");
const { version } = require("../package.json");

const options = {
	definition: {
		swagger: "2.0",
		info: {
			title: "Gift registry support tool api documentation",
			version: version,
			description:
				"The documentation describes the usage of different api endpoint for the Giftregistry support app",
			contact: {
				name: "Ashutosh Singh",
				email: "ashutosh.singh@swymcorp.com",
			},
		},
		servers: [
			{
				url: process.env.HOST_URL,
			},
		],
	},
	apis: ["../routes/*.js", "../models/*.schema.js"],
};

const spacs = swaggerJsDoc(options);

module.exports = { spacs };
