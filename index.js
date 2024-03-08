const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app
  .get("/", (req, res) => {
    res.set({
      "Allow-acces-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(8080);

console.log("Listening on port 8080");

mongoose.connect(
  "mongodb+srv://rohit7019907:rohit7019907@cluster0.l8opmjh.mongodb.net/"
);
var db = mongoose.connection;
db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/signup", (req, res) => {
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var phno = req.body.phno;
  var gender = req.body.gender;

  var user_info = {
    name: name,
    age: age,
    email: email,
    phno: phno,
    gender: gender,
  };
  db.collection("users").insertOne(user_info, (err, collection) => {
    if (err) {
      throw err;
    }
  });
  return res.redirect("signup_success.html");
});
