var mongoose =require("mongoose");

var PersonalitiesSchema = {
  name: String,
  description: String,
  firstName: String,
  lastName: String
}

mongoose.model("Personalities", PersonalitiesSchema);
mongoose.connect("mongodb://localhost/quietloud");

module.exports = mongoose;
