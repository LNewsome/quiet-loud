var mongoose =require("./connection");
var seedData =require("./seeds.json");
var Personalities = mongoose.model("Personalities");

Personalities.remove().then(function(){
  Personalities.create(seedData).then(function(){
    process.exit();
  });
});
