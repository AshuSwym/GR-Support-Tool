const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const { spacs } = require("./utils/swagger");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const auth = require("./routes/auth");
const pid = require("./routes/pid")
const verifyJWT = require("./middleware/verifyJwt");
const changeLogger = require("./middleware/changeLogger");

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
app.use('/api', pid);

try {
	app.listen(PORT, () => {
		mongoose.connect(process.env.MONGO_URI);
		console.log(`Database connected`);
		console.log(`Server listening on Port ${PORT}`);
	});
} catch (error) {
	console.log(`Unable to start the server : ${error.message}`);
}
