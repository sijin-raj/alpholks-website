const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
let admin = require("firebase-admin");

var serviceAccount = require("./adminSdk/alpholks-training-firebase-adminsdk-uu761-2c7ad52b76.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alpholks-training.firebaseio.com",
  projectId: "alpholks-training"
});

let db = admin.firestore().collection("messages");

var adminapp = express();
// add service apis
// get list of services
// get one service detail


// view engine setup
adminapp.set("views", path.join(__dirname, "views"));
adminapp.set("view engine", "jade");

adminapp.use(logger("dev"));
adminapp.use(express.json());
adminapp.use(express.urlencoded({ extended: false }));
adminapp.use(bodyParser.json());
adminapp.use(cookieParser());
adminapp.use(cors());
adminapp.use(express.static(path.join(__dirname, "public")));


adminapp.post("/contacts", function(req, res) { 
  console.log("coming");
   db.doc()
    .set(req.body)
    .then((response) => {
      return res.status(200).send("Email Sent")
    })
    .catch((err) => {
      return res.status(200).send("Message not sent, Email us at alpholks@gmail.com")
    });
  // const { name, email, message } = req.body;
  // const msg = {
  //   to: "alpholks@gmail.com",
  //   from: `${email}`,
  //   subject: "Happy news, someone visited our website",
  //   text: "Details",
  //   html: `<strong>Name </strong>: ${name} <br />
  //   <strong>Email </strong>: ${email} <br />
  //   <strong>Mobile </strong>: ${message} <br />`
  // };

  // sgMail
  //   .send(msg)
  //   .then(response => {
  //     // console.log("sent", response);
  //     res.status(200).send("Email sent");
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(400).send("Mail not sent");
  //   });
});


// catch 404 and forward to error handler
adminapp.use((req, res, next) => {
  next(createError(404));
});


// error handler
adminapp.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

exports.adminapp = functions.https.onRequest(adminapp);
