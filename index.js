var express = require("express");
var app = express();

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("");

const { MongoClient } = require("mongodb");

var connection =
  "mongodb+srv://saaidehosama:F9mpzQNZq837fXxD@inventory.eklpag8.mongodb.net/?retryWrites=true&w=majority&appName=inventory";

const client = new MongoClient(connection);

const mydb = client.db("full-stack-training");

const collection = mydb.collection("users");

app.get("/", function (req, res) {
  res.send("hiii");
});

app.get("/users", async (req, res) => {
  //find  =>{}=>all
  const users = await collection.find({}).toArray();
  res.send(users);
});

app.get("/user/:username", async (req, res) => {
  //find  =>{}=>all
  const users = await collection.findOne({ username: req.params.username });
  res.send(users);
});

var bodyParse = require("body-parser");

var urlEncoded = bodyParse.urlencoded({ extended: false });

app.get("/loginform", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", urlEncoded, async (req, res) => {
  const finduser = await collection.findOne({ username: req.body.username });

  console.log(finduser);
  if (finduser) {
    // localStorage.setItem("user", finduser.username);
    // console.log(localStorage.getItem("user"));
    res.sendFile(__dirname + "/userInfo.html");
  } else {
    res.sendFile(__dirname + "/register.html");
  }
});
app.get("/registerform", function (req, res) {
  res.sendFile(__dirname + "/register.html");
});

app.post("/register", urlEncoded, async (req, res) => {
  const createuser = await collection.insertOne({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
  });
  res.end("user added successfully");
});

var server = app.listen(7000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("start my one");
});
