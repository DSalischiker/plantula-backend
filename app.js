require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const mongoConnectionUrl = process.env.MONGO_URL;

const mongoDB = mongoConnectionUrl;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //tls: true,
  //tlsCAFile: "./ca-certificate.crt",
});
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

mongoose.Promise = global.Promise;

require("./src/auth");

const routes = require("./src/routes");
const inventoryRoutes = require("./src/routes/inventory");
const plantRoutes = require("./src/routes/plant");
/* const referrersRoutes = require("./src/routes/referrer");
const referralsRoutes = require("./src/routes/referral");
const dataRoutes = require("./src/routes/general"); */

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);
app.use("/inventory", inventoryRoutes);
app.use("/plant", plantRoutes);
/* app.use("/referrers", referrersRoutes);
app.use("/referrals", referralsRoutes);
app.use("/data", dataRoutes); */

// Plug in the JWT strategy as a middleware so only verified users can access this route.
//app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(process.env.PORT, () => {
  console.log("Server started.");
});