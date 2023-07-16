const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },

  password: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
    // default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
  isAdmin: {
    type: String,
    required: true,
    default: false,
  },
  chatRequests: [],
  gender: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  student: {
    type: String,
    default: "",
  },
  institude: {
    type: String,
    default: "",
  },
  created_at: { type: Date, required: true, default: Date.now() },
});
module.exports = mongoose.model("user", userSchema);
