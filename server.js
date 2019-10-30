// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

//establishes the arrays
var tables = [{
    customerName: "Barb",
    customerEmail: "barb@justice4barb.com",
    customerID: "deadNotGone",
    phoneNumber: "911-why-barb"
}, {
    customerName: "11",
    customerEmail: "bossB11tch@test.gov",
    customerID: "leggoMyEggo",
    phoneNumber: "Call me through the UpsideDown"
}, {
    customerName: "Hopper",
    customerEmail: "hippityHopper@test.gov",
    customerID: "Hopper",
    phoneNumber: "8675309"
}];
var waitList = [];

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all tables
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitList);
});

// Create New Tables - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newTable = req.body;

    // // Using a RegEx Pattern to remove spaces from newCharacter
    // // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newTable. = newTable.customerName.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);

    if(tables.length < 5){
        tables.push(newTable);
        res.json(true);
    }
    else {
        waitList.push(newTable);
        res.json(false);
    }

    res.json(newTable);
});

// app.post("/api/waitlist", function (req, res) {
//     // req.body hosts is equal to the JSON post sent from the user
//     // This works because of our body-parser middleware
//     var newTable = req.body;

//     // Using a RegEx Pattern to remove spaces from newCharacter
//     // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//     newTable.customerID = newTable.customerName.replace(/\s+/g, "").toLowerCase();

//     console.log(newTable);

//     waitlist.push(newTable);

//     res.json(newTable);
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
