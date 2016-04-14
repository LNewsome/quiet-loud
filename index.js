var express = require("express");
var hbs     = require("express-handlebars")
var app     = express();

app.get("/", function(req, res){
    res.send("Hello, Fellow Introverts and Extroverts!")
});

app.listen(3003, function(){
  console.log("Work!")
});
