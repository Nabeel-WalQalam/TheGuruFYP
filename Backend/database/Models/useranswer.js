const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userQuestions",
  },
  asnwer_description: { type: String, required: true },
  user: Object,
  commet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
  },
  votes: { type: Number, default: 0 },
  // answers: { type: Number, default: 0 },
  // views: {
  //   userslist: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  //   count: { type: Number, default: 0 },
  // },
});
module.exports = mongoose.model("userAnswer", userAnswerSchema);
