const mongoose = require("mongoose");

const userQuestionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [],
  user: [],
  votes: { type: Number, default: 0 },
  answers: { type: Number, default: 0 },
  views: {
    userslist: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    count: { type: Number, default: 0 },
  },
});
module.exports = mongoose.model("userQuestions", userQuestionsSchema);
