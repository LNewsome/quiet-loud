var express = require("express");
var hbs     = require("express-handlebars");
var parser  = require("body-parser");
var debugLog = require('debug-log')('foo');
var app     = express();
var mongoose =require("./db/connection");
var Personalities = mongoose.model("Personalities");
var Forum = mongoose.model("Forum-show");

app.use(parser.urlencoded({extended: true}));
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:     ".hbs",
  partialsDir: "views/",
  layoutsDir:  "views/",
  defaultLayout:"layout-main"
}));
app.use("/public", express.static("public"));

app.get("/", function(req, res){
    Personalities.find().then(function(response){
      res.render("personalities-index",{
        personalities: response
      });
    });
});
app.get("/personalities", function(req, res){
  res.render("personalities-index", {
    personalities: personalities
  });
});
app.get("/:name", function(req, res){
  Personalities.findOne(req.params).then(function(response){
    res.render("personalities-show",{
      personalities: response
    });
  });
});


// crud for forum-show
app.get("/", function(req, res){
  Personalities.find(req.params).then(function(response){
      response.send("/");
  });
});
app.post("/", function(request, response){
  Personalities.find(req.params).then(function(response){
    response.send("/");
  });
});
app.put("/:id", function(request, response){
  Personalities.find(req.params).then(function(response){
    response.send("/");
  });
});
app.delete("/:id", function(request, response){
  Personalities.find(req.params).then(function(respon){
      response.send("DELETE");
  });
});

app.listen(3003, function(){
  console.log("Work!")
});
