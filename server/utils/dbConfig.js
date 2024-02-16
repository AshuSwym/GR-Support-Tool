const { Client } = require("pg");

const queryFromPostgres = async (query) => {
	const dbConfig = {
		user: process.env.POSTGRES_USER,
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB,
		password: process.env.POSTGRES_PASS,
		port: process.env.POSTGRES_PORT,
		dialect: "postgres",
		dialectOptions: {
			ssl: {
				require: true, // This will help you. But you will see nwe error
				rejectUnauthorized: false, // This line will fix new error
			},
		},
	};
	const client = new Client(dbConfig);
	console.log(dbConfig);
	// Connect to the database
	client
		.connect()
		.then(() => {
			console.log("Connected to PostgreSQL database");

			// Execute SQL queries here

			client.query(query, (err, result) => {
				if (err) {
					console.error("Error executing query", err);
				} else {
					return result;
					console.log("Query result:", result.rows);
				}

				// Close the connection when done
				client
					.end()
					.then(() => {
						console.log("Connection to PostgreSQL closed");
					})
					.catch((err) => {
						console.error("Error closing connection", err);
					});
			});
		})
		.catch((err) => {
			console.error("Error connecting to PostgreSQL database", err);
		});
};

module.exports = { queryFromPostgres };
