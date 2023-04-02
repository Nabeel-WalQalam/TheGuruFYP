const mongoose = require("mongoose");

const userQuestionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [],
  user: Object,
  votes: { type: Number, default: 0 },
  commet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
  },
  views: {
    userslist: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    count: { type: Number, default: 0 },
  },
});
module.exports = mongoose.model("userQuestions", userQuestionsSchema);
