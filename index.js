var express = require("express");
var hbs     = require("express-handlebars");
var app     = express();
var mongoose =require("./db/connection");
var Personalities = mongoose.model("Personalities");

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:     ".hbs",
  partialsDir: "views/",
  layoutsDir:  "views/",
  defaultLayout:"layout-main"
}));
app.use("/public", express.static("public"));

app.get("/", function(req, res){
    Personalities.findOne().then(function(response){
      res.json(response);
    });
});
app.get("/personalities", function(req, res){
  res.render("personalities-index", {
    personalities: personalities
  });
});

app.listen(3003, function(){
  console.log("Work!")
});
