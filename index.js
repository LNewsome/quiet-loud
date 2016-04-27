var express = require("express");
var hbs     = require("express-handlebars");
var parser  = require("body-parser");
var debugLog = require('debug-log')('foo');
var app     = express();
var mongoose =require("./db/connection");
var crud = require("express-mongoose-crud");
var Personalities = mongoose.model("Personalities");



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
      body: req.body,
      personalities: response
    });
  });
});
crud = crud({mongoose:mongoose});
app.post("/:entity", crud, function(req, res){
  res.json(res.locals[req.params.entity]);
});
app.get("/:entity/:id", crud, function(req, res){
  res.json(res.locals[req.params.entity]);
});
app.get("/:entity", crud, function(req, res){
  res.json(res.locals[req.params.entity]);
});
app.put("/;entity/:id", crud, function(req, res){
  res.json(req.locals[req.params.entity]);
});
app.delete("/:entity/:id",crud, function(req, res){
  res.json(req.locals[req.params.entity]);
});

app.listen(3003, function(){
  console.log("Work!")
});
