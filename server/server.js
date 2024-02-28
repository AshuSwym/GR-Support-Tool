const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const { spacs } = require("./utils/swagger");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const auth = require("./routes/auth");
const pid = require("./routes/getAccessTokens");
const getData = require("./routes/getData");
const edit = require("./routes/editAppConfig");

const verifyJWT = require("./middleware/verifyJwt");
const changeLogger = require("./middleware/changeLogger");

const { checkConnection } = require("./utils/dbConfig");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);

app.get("/", (req, res) => {
	res.send("Working fine");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));
app.use("/user", auth);
app.use(verifyJWT);
app.use(changeLogger);
app.use("/api", pid);
app.use("/getData", getData);
app.use("/edit", edit);
try {
	app.listen(PORT, async () => {
		await mongoose.connect(process.env.MONGO_URI).then(() => {
			console.log(`MongoDB connected`);
		});
		try {
			await checkConnection();
		} catch (error) {
			console.log(error);
		}

		console.log(`Server listening on Port ${PORT}`);
	});
} catch (error) {
	console.log(`Unable to start the server : ${error.message}`);
}
