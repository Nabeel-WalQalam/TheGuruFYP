const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userQuestions",
  },
  upVote: {
    type: [String],
    default: [],
  },
  downVote: {
    type: [String],
    default: [],
  },
  post_date: { type: Date, default: Date.now() },
  asnwer_description: { type: String, required: true },
  user: Object,
  commet: [],
  votes: { type: Number, default: 0 },
  // answers: { type: Number, default: 0 },
  // views: {
  //   userslist: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  //   count: { type: Number, default: 0 },
  // },
});
module.exports = mongoose.model("userAnswer", userAnswerSchema);
