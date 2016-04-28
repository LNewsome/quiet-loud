var mongoose =require("mongoose");

var UserQuestionSchema = {
  firstname: String,
  lastname: String,
  question: String
}

var PersonalitiesSchema = {
  personality: String,
  description: String,
  firstName: String,
  lastName: String,
  user_questions: [
    UserQuestionSchema
  ]
}

mongoose.model("Personalities", PersonalitiesSchema);
mongoose.connect("mongodb://localhost/quietloud");

module.exports = mongoose;
