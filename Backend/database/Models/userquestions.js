const mongoose = require("mongoose");

const userQuestionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});
module.exports = mongoose.model("userQuestions", userQuestionsSchema);
