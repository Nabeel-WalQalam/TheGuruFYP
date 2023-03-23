const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatsessionSchema = new Schema({

    sessionAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    sessionUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    sessionStatus: {
        type: Boolean,
        default: false,
        required: true
    }



}
    , { timestamps: true });

module.exports = mongoose.model("chatsession", chatsessionSchema);