const mongoose = require("mongoose");

const userQuestionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [],
  user: Object,
  upVote: {
    type: [String],
    default: [],
  },
  downVote: {
    type: [String],
    default: [],
  },
  commet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
  },
  post_date: { type: Date, default: Date.now() },
  views: {
    userslist: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    count: { type: Number, default: 0 },
  },
});
module.exports = mongoose.model("userQuestions", userQuestionsSchema);
