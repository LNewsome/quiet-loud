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
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect("mongodb://localhost/3000");
}

module.exports = mongoose;
