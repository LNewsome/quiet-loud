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
if(process.env.NODE_ENV =="production"){
  mongoose.connection(process.env.MONGOLAB_URL);
}else{
  mongoose.connect("mongodb://localhost/quietloud");
}

module.exports = mongoose;
