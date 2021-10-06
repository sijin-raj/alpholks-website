var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var bodyParser = require("body-parser");
var cors = require("cors");
let admin = require("firebase-admin");

var serviceAccount = require("./alpholks-training-firebase-adminsdk-uu761-2c7ad52b76.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alpholks-training.firebaseio.com"
});


var adminapp = express();

// view engine setup
adminapp.set("views", path.join(__dirname, "views"));
adminapp.set("view engine", "jade");
adminapp.use(cors());
adminapp.use(logger("dev"));
adminapp.use(express.json());
adminapp.use(express.urlencoded({ extended: false }));
adminapp.use(bodyParser.json());
adminapp.use(cookieParser());
adminapp.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
adminapp.use(function (req, res, next) {
  next(createError(404));
});

// error handler
adminapp.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = adminapp;
