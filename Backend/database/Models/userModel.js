const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },

    password: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        // default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    isAdmin: {
        type: String,
        required: true,
        default: false
    },
    chatRequests: []

});
module.exports = mongoose.model("user", userSchema);

