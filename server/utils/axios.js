const axios = require('axios');

const instance = axios.create({
	baseURL: process.env.GR_SERVER_URL,
});

module.exports = instance;