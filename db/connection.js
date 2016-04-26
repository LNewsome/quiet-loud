var mongoose =require("mongoose");

var PersonalitiesSchema = {
  name: String,
  description: String,
  firstName: String,
  lastName: String
}

mongoose.model("Personalities", PersonalitiesSchema);
mongoose.model("Forum",ForumSchema);
mongoose.connect("mongodb://localhost/quietloud");

module.exports = mongoose;
