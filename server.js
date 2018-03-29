var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/student");
var nameSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastName: String,
    mobile:Number,
    studid:Number,
    year:String,
    branch:String,
    password:String
});
var User = mongoose.model("registration", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index1.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("STUDENT DETAILS ADDED");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});