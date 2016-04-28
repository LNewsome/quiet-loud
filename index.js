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
  Personalities.find().then(function(results){
    res.render("personalities-index",{
      personalities: results
    });
  });
});

// Create a UserQuestio, for a specific personality
app.post("/personalities/:personaity/user_questions", function(req, res){
  //find personality
  Personalities.findOne({personality: "introvert"}).then(function(personality){
    //add question to persanilty
    //go to show page
    var new_user_question = req.body.personality
    personaility.questions.push(new_user_question)
  });
  res.redirect("/personalities/" + req.personality+ "/user_questions")
});

app.get("/personalities/:personality/user_questions", function(req, res){
  Personalities.findOne({personality:"introvert"}).then(function(result){
    console.log("Personality: ", result);
    res.render("forum-show",{
      user_questions:result
    });
  })
})

app.get("/:name", function(req, res){
  Personalities.findOne(req.params).then(function(response){
    res.render("personalities-show",{
      body: req.body,
      personalities: response
    });
  });
});


app.listen(3003, function(){
  console.log("Work!")
});
