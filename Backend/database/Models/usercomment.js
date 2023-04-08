const mongoose = require("mongoose");

const userCommentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  answer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userAnswer",
  },
  post_date: { type: Date, default: Date.now() },
  user: Object,
});
module.exports = mongoose.model("userComment", userCommentSchema);
