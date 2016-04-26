var express = require("express");
var hbs     = require("express-handlebars");
var parser  = require("body-parser");
var debugLog = require('debug-log')('foo');
var app     = express();
var mongoose =require("./db/connection");
var personalities = express();
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
app.get("/:name/forum-show", function(req, res){
  Personalities.findOne(req.params).then(function(response){
    res.render("personalities-show",{
      body: req.body,
      personalities: response
    });
  });
});


// // crud for forum-show
// app.get("/", function(req, res){
//   Personalities.findOne(req.params).then(function(response){
//       res.redirect("forum-show");
//   });
// });
//
// app.post("/:name", function(req, res){
//   Personalities.find({name: req.params.name, req.body.personalities, {
//      new:true}).then(function(personalities){
//        res.render("forum-show",{
//          personalities: personalities);
//     });
//  });
// app.put("/:id", function(request, response){
//   Personalities.find(req.params).then(function(response){
//     res.send("/");
//   });
// });
// app.delete("/:id", function(request, response){
//   Personalities.find(req.params).then(function(respon){
//       response.send("DELETE");
//   });
// });
app.post("/Personalities", function(req, res){
   res.json(req.body);
 });


app.listen(3003, function(){
  console.log("Work!")
});
