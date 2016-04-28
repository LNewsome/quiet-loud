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
  res.redirect("/personalities")
});

app.get("/personalities", function(req, res){
  Personalities.find().then(function(results){
    res.render("personalities-index",{
      personalities: results
    });
  });
});

// Create a UserQuestio, for a specific personality
app.post("/personalities/:name/user_questions", function(req, res){
  //find personality
  // console.log("params", req.params)
  // console.log("body", req.body)
  Personalities.findOne({personality: req.params.name}).then(function(personality){
    if(personality === null){
      res.send("Personality NOT found:" + req.params);
    } else {
      //add question to personalty
      //go to show page
      // console.log("post P:", personality)
      var new_user_question = req.body.personality
      personality.user_questions.push(new_user_question)
      personality.save(function (err) {
        if (err) return handleError(err);
        res.redirect("/" + personality.personality)
      })
    }
  }).catch(function(err){
    res.send("ERROR: " + err);
  });
});

app.get("/:name", function(req, res){
  // console.log("GET personality", req.params)
  Personalities.findOne({personality: req.params.name}).then(function(found_personality){
    // console.log("Personality: ", found_personality);
    if(found_personality === null){
      res.send("Personality NOT found: " + req.params.name);
    } else {
      res.render("personalities-show",{
        personality: found_personality
      });
    }
  })
});


app.listen(3003, function(){
  console.log("Work!")
});
