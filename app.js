const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const rawdata = fs.readFileSync('parsedConst.json');
const parsedConst = JSON.parse(rawdata);

app.get("/", function(req, res) {
  const url = "https://assignment7:nQHcb8jFKxEU@demo.telemagic.no:8894/rest/agent";
  https.get(url, function(response) {
    console.log(response.statusCode);

    var body = '';

    response.on('data', function(data) {
      body += data;
    });

    response.on('end', function() {
      const parsed = JSON.parse(JSON.stringify(body));
      console.log('endSTATUS: ' + parsed);
      parsedConst.forEach(function(elem) {
        console.log(elem.username);
      })
    });
  });
  res.render("home", {});
})

app.get("/about", function(req, res) {
  res.render("about", {
    parsedConst1: parsedConst
  });
});

app.listen(3000, function() {
  console.log("Server is running in port 3000");
});
