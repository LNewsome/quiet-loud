var express = require("express");
var hbs     = require("express-handlebars");
var parser  = require("body-parser");
var debugLog = require('debug-log')('foo');
var app     = express();
var mongoose =require("./db/connection");
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
      personalities: response
    });
  });
});
app.post("/:name", function(req, res){
  Personalities.findOneAndUpdate(req.params, req.body.personalities, {
    new:true}).then(function(response){
      res.redirect("/" + response.name);
    });
});
// app.post("/:name", function(req, res){
//   Personalities.findOneAndUpdate(req.params, req.body.personalities, {
//     new:true}).then(function(response){
//       res.redirect("/" + response.name);
//     });
// });


app.listen(3003, function(){
  console.log("Work!")
});
